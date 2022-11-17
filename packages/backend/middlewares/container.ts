import type {Middleware} from '#/backend/types';
import {set} from '#/backend/di';

/**
 *
 */
const factory = async (): Promise<Middleware> => {
    return (req, res, next) => {
        set('req', req);
        set('res', res);

        return next();
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.11.2021
 * Time: 12:57
 */
export default factory;
