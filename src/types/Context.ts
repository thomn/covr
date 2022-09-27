import {Request} from 'fsbr';

export type Entry<T> = Map<string, Record<string, unknown> & {
    body: T | string
}>

export type Context = {
    json<T>(): Promise<Entry<T>>;
    text(): Promise<Entry<string>>;
    binary<T>(): Promise<Entry<T>>;
    setRequest(req: Request);
    setParam(object);
    setQuery(object);
    getParam<T = object>(): T;
}
