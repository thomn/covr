/**
 *
 * @param fns
 * @internal
 */
export const pipe = <T> (...fns) => (args): T => (
    fns.reduce((acc, next) => next(acc), args)
);

/**
 *
 * @param object
 * @param path
 */
export const traverse = <T extends object> (object: object, path: string): T => {
    return path.split('.')
        .reduce((object, property) => (object || {})[property], object)
    ;
};
