import {readdir} from 'fs';
import {promisify} from 'util';
import {Direction, MigrationFunctions, getLatestMigration, getMigrations, getMigrationsTill, insertMigration, updateMigrations, IMigration} from '#/backend/models';
import {resolve} from 'path';
import {version} from '#/backend/modules';
import {capture} from '#/backend/debug';
import logger from '#/backend/logger';

const readDir = promisify(readdir);

const REGEX_FILENAME = /^v(\d+\.\d+\.\d+)-(.+)\.ts$/gmi;

/**
 *
 * @param root
 */
const factory = (root: string) => {
    const log = logger('migration');
    const path = resolve(root, 'migrations');

    /**
     *
     * @param pointer
     */
    const load = <T> (pointer: string): T => {
        try {
            let mod = require(pointer);
            if (mod.default && typeof mod.default === 'function') {
                mod = mod.default;
            }

            return mod;
        } catch (e) {
            capture(e)
        }
    };

    /**
     *
     * @param originalVersion
     * @param direction
     */
    const run = async (originalVersion: string, direction = Direction.UP): Promise<IMigration[]> => {
        const {normalized} = version(originalVersion).parse();

        const latestMigration = await getLatestMigration();
        if (!latestMigration) {
            log('There are no pending migrations.')

            return;
        }

        const candidates = await getMigrationsTill(normalized, direction);

        let run = 0;
        const completed = [];

        for (const migration of candidates) {
            const {fileName} = migration;

            const cursor = resolve(path, fileName);
            const fns = load<MigrationFunctions>(cursor);
            if (!fns[direction]) {
                throw new Error(`The "${direction}" export is not defined in ${fileName}.`);
            }

            try {
                const {[direction]: fn} = fns;
                await fn();

                log(`${direction.toUpperCase()} ${fileName}`);

                await updateMigrations(migration, direction);
                completed.push(migration.toJSON());
                run++;
            } catch (err) {
                log(`Failed to run migration ${migration.name} due to an error.`);
                log('Not continuing. Make sure your data is in consistent state');

                throw new Error(err);
            }
        }

        if (candidates.length == run && run > 0) {
            log('All migrations finished successfully.');
        }

        return completed;
    };

    /**
     *
     */
    const sync = async () => {
        log('synchronization');

        try {
            const inDatabase = await getMigrations();

            const migrations = await readDir(path);
            const promises = migrations.filter((file) => new RegExp(REGEX_FILENAME).test(file))
                .map((fileName) => {
                    const [, version, name] = new RegExp(REGEX_FILENAME).exec(fileName);
                    const existsInDatabase = inDatabase.some((migration) => {
                        return migration.version.original === version;
                    });

                    return {
                        name,
                        fileName,
                        version,
                        existsInDatabase,
                    };
                })
                .filter((({existsInDatabase}) => !existsInDatabase))
                .map(async ({version, name, fileName}) => {
                    log(`inserting: ${version}-${name}`);

                    return insertMigration(version, name, fileName);
                })
            ;

            return Promise.all(promises);
        } catch (error) {
            log('synchronization failed: ' + error.message);

            throw error;
        }
    };

    return {
        sync,
        run,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.11.22
 * Time: 10:28
 */
export default factory;
