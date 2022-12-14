import teda, {Format} from 'teda';
import logger from '#/backend/logger';
import type {Middleware} from '#/backend/types';

/**
 *
 */
const factory = async (): Promise<Middleware> => {
    const log = logger('server');

    /**
     *
     * @param req
     */
    const skip = (req) => {
        const {url} = req;

        return [
            '/',
            '/favicon.ico',
        ].includes(url);
    };

    return teda(Format.DEFAULT, {
        skip,
        adapter: log,
    });
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.11.2021
 * Time: 12:57
 */
export default factory;
