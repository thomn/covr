import {AsyncLocalStorage} from 'async_hooks';
import conr, {Conr} from 'conr';
import {Resolve} from '#/backend/types';

const container = conr();
const storage = new AsyncLocalStorage<Conr>();

/**
 *
 * @param key
 * @param value
 */
const set = (key: string, value: unknown) => {
    storage.getStore().set(key, value);
};

/**
 *
 */
function get (): Conr;
function get<T> (key: string): T;
function get (key?: string): unknown {
    const store = storage.getStore();

    if (!key) {
        return store;
    }

    return store.get(key);
}

/**
 *
 * @param fn
 */
const resolve = <T> (fn: Resolve<T>) => {
    return get().resolve(fn);
};

/**
 *
 * @param fn
 */
const run = (fn: () => unknown): Promise<unknown> => (
    new Promise((resolve, reject) => {
        storage.run(container, () => {
            try {
                resolve(fn());
            } catch (e) {
                reject(e);
            }
        });
    })
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 13.12.2021
 * Time: 12:41
 */
export {
    get,
    set,
    run,
    resolve,
};
