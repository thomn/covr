import sevl from 'sevl';
import type {Env} from './types';

/**
 *
 */
const factory = () => {
    let env: unknown;

    return async (): Promise<Partial<Env>> => {
        if (env) {
            return env;
        }

        env = await sevl<Env>({
            cwd: process.cwd(),
        });

        return env || {};
    };
};

/**
 *
 */
export const isDev = (): boolean => {
    return !!process[Symbol.for('ts-node.register.instance')];
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.01.2022
 * Time: 08:44
 */
export default factory();
