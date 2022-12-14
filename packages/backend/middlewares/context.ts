import {parse} from 'url';
import {context} from '#/backend/modules';
import {set} from '#/backend/di';
import type {Middleware} from '#/backend/types';

/**
 *
 */
const factory = async (): Promise<Middleware> => {
    return (req, res, next) => {
        const {query} = parse(req.url, true);
        const instance = context();
        instance.setQuery(query);
        instance.setRequest(req);

        set('context', instance);

        return next();
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.12.2021
 * Time: 15:28
 */
export default factory;
