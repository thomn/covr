import type {DI, Middleware} from '#/backend/types';

/**
 *
 * @param set
 * @param props
 */
const factory = async ({set}: Pick<DI, 'set'>, props: Record<string, unknown>): Promise<Middleware> => {
    for (const [key, value] of Object.entries(props)) {
        set(key, value);
    }

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
