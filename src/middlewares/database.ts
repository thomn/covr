import {database} from '#/modules';
import type {Middleware} from '#/types';
import {set} from '#/di';

/**
 *
 */
const factory = async (dsn: string): Promise<Middleware> => {
    const instance = database(dsn).init();

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
