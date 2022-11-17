import {capture} from '#/backend/debug';
import type {Middleware} from '#/backend/types';

/**
 *
 */
const factory = async (): Promise<Middleware> => {
    return (req, res, next, error) => {
        capture(error);

        return next();
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.04.2022
 * Time: 15:35
 */
export default factory;
