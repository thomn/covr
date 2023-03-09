import {resolve} from 'path';
import fsbr from 'fsbr';
import * as di from '#/backend/di';
import {server, database} from '#/backend/modules';
import config, {isDev} from '#/backend/config';
import {capture} from '#/backend/debug';
import {container, context, debug, logger, serve, sinkhole} from '#/backend/middlewares';
import log, {register} from '#/backend/logger';

import {name, version} from '../../package.json';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 10.12.2021
 * Time: 11:32
 */
export default async () => {
    register(name);
    log('app')(`>>> ${version}`, 'BLUE');

    const {PORT, DEBUG, MONGODB_DSN} = await config();
    const root = resolve(__dirname);

    await database().init(MONGODB_DSN);
    // const {sync, run} = migration(root);
    // await sync();
    // await run(version);

    /**
     *
     */
    const router = async () => {
        const {register, route, use} = fsbr({
            ext: isDev()
                ? '.ts'
                : '.js',
            dev: JSON.parse(DEBUG || 'false'),
        });

        use(await logger());
        use(await debug());
        use(await container(di, {version}));
        use(await serve(root, ['storage']));
        use(await context());

        await register(resolve(root, 'routes'));

        use(await sinkhole());

        return route;
    };

    return di.run(async () => {
        return server()
            .serve(await router())
            .listen(PORT)
            .catch(capture);
    });
};
