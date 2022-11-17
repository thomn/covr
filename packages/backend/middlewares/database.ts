import {database} from '#/backend/modules';
import type {Middleware} from '#/backend/types';
import {set} from '#/backend/di';

/**
 *
 */
const factory = async (dsn: string): Promise<Middleware> => {
    const instance = database().init(dsn);

    return (req, res, next) => {
        set('db', instance);

        return next();
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 07.09.22
 * Time: 20:01
 */
export default factory;
