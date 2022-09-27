import {resolve} from 'path';
import fsbr from 'fsbr';
import {container, context, database, debug, logger, sinkhole} from '#/middlewares';
import config from '#/config';

/**
 *
 */
const factory = async () => {
    const {DEBUG, MONGODB_DSN} = await config();

    const {register, route, use} = fsbr({
        ext: '.ts',
        dev: JSON.parse(DEBUG || 'false'),
    });

    use(await logger());
    use(await debug());
    use(await container());
    use(await context());
    use(await database(MONGODB_DSN));

    const path = resolve(__dirname, 'routes');
    await register(path);

    use(await sinkhole());

    return route;
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.02.2022
 * Time: 20:42
 */
export default factory;
