import {resolve} from 'path';
import fsbr from 'fsbr';
import {server} from '#/backend/modules';
import config from '#/backend/config';
import {capture} from '#/backend/debug';
import {
    container,
    context,
    database,
    debug,
    logger,
    sinkhole,
} from '#/backend/middlewares';
import log, {register} from '#/backend/logger'

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

    /**
     *
     */
    const router = async () => {
        const {register, route, use} = fsbr({
            ext: '.ts',
            dev: JSON.parse(DEBUG || 'false'),
        });

        use(await logger());
        use(await debug());
        use(await container());
        use(await context());
        use(await database(MONGODB_DSN));

        const path = resolve(root, 'routes');
        await register(path);

        use(await sinkhole());

        return route;
    };

    return server()
        .serve(await router())
        .listen(PORT)
        .catch((e) => capture(e))
    ;
};
