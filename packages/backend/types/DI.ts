import {Conr} from 'conr';
import {Resolve} from '#/backend/types/Container';

export type DI = {
    get (): Conr;
    get<T> (key: string): T;
    get (key?: string): unknown;
    set (key: string, value: unknown);
    resolve<T> (fn: Resolve<T>);
    run (fn: () => unknown): Promise<unknown>
}
