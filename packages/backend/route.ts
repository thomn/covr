import {get, resolve} from './di';
import type {Context, Resolve} from './types';

/**
 *
 * @param fn
 */
const factory = <T = object> (fn: Resolve<T>) => {
    return (req, res, param) => {
        const context = get<Context>('context');
        context.setParam(param);

        return resolve(fn);
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.12.2021
 * Time: 12:41
 */
export default factory;
