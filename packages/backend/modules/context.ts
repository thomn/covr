import type {Request} from 'fsbr';
import fdex, {getBoundary} from 'fdex';
import type {Context, Entry} from '#/backend/types';

/**
 *
 */
const factory = (): Context => {
    const context: {
        query: object,
        req: Request,
        param: object,
    } = {
        query: undefined,
        req: undefined,
        param: undefined,
    };

    /**
     *
     */
    const extract = <T>(): Promise<Entry<T>> => {
        const {req} = context;

        return new Promise((resolve, reject) => {
            const entries = new Map();

            const contentType = req.headers['content-type'];
            const boundary = getBoundary(contentType);

            const extractor = fdex(boundary);

            /**
             *
             * @param headers
             * @param body
             */
            const onData = ([headers, body]) => {
                const {['Content-Disposition']: content} = headers;
                const {name, ...rest} = content.split(/;\s/g)
                    .map((string) => string.split(/=/))
                    .filter(([key]) => key !== 'form-data')
                    .map(([key, ...rest]) => [key, rest.join('=')])
                    .reduce((acc, [key, value]) => (
                        (acc[key] = value.replace(/^"(.+)"$/, '$1')) && acc
                    ), {})
                ;

                entries.set(name, {
                    body,
                    ...rest,
                });
            };

            /**
             *
             */
            const onEnd = () => {
                resolve(entries);
            };

            req.pipe(extractor)
                .on('data', onData)
                .on('end', onEnd)
                .on('error', reject)
            ;
        });
    };

    /**
     *
     * @param modifier
     */
    const modify = (modifier) => (entry) => {
        for (const [key, {body, ...rest}] of entry.entries()) {
            entry.set(key, {
                ...rest,
                body: modifier(body),
            });
        }

        return entry;
    };

    /**
     *
     */
    const binary = <T>(): Promise<Entry<T>> => (
        extract<T>()
    );

    /**
     *
     */
    const json = <T>(): Promise<Entry<T>> => {
        return text()
            .then(modify((body) => JSON.parse(body)));
    };

    /**
     *
     */
    const text = (): Promise<Entry<string>> => {
        return extract<string>()
            .then(modify((body) => body.toString()));
    };

    /**
     *
     * @param object
     */
    const setParam = (object) => {
        context.param = object;
    };

    /**
     *
     * @param object
     */
    const setQuery = (object) => {
        context.query = object;
    };

    /**
     *
     * @param req
     */
    const setRequest = (req: Request) => {
        context.req = req;
    };

    /**
     *
     */
    const getParam = <T = object>(): T => {
        return context.param as T;
    };

    return {
        binary,
        text,
        json,
        setRequest,
        setQuery,
        setParam,
        getParam,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.02.2022
 * Time: 20:34
 */
export default factory;
