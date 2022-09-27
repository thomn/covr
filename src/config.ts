import sevl from 'sevl';
import type {Env} from '#/types';

/**
 *
 */
const factory = () => {
    let env: Env;

    return async (): Promise<Partial<Env>> => {
        if (env) {
            return env;
        }

        return await sevl<Env>();
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.01.2022
 * Time: 08:44
 */
export default factory();
