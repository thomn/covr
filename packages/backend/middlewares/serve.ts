import {stat} from 'fs/promises';
import {createReadStream as stream} from 'fs';
import {parse} from 'url';
import {join, resolve, normalize} from 'path';
import {Middleware} from 'fsbr';
import {pipe} from '#/backend/utils';

/**
 *
 * @param root
 * @param folders
 */
const factory = (root: string, folders: string[]): Middleware => {
    root = resolve(root, '..', '..');

    /**
     *
     */
    return async (req, res, next) => {
        const {pathname} = parse(req.url);
        const folder = folders.map((folder) => `/${folder}`)
            .find((folder) => pathname.startsWith(folder))
        ;
        if (!folder) {
            return next();
        }

        const path = pipe<string>(
            (pathname) => join(root, pathname),
            (path) => normalize(path),
            (path) => path.replace(/^(\.\.(\/|\\|$))+/, ''),
            (path) => resolve(path),
        )(pathname);

        try {
            const stats = await stat(path);
            if (!stats.isFile()) {
                return next();
            }

            return stream(path);
        } catch (e) {
            return next(e);
        }
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.12.22
 * Time: 08:28
 */
export default factory;
