/**
 *
 * @param fns
 * @internal
 */
export const pipe = <T>(...fns) => (args): T => (
    fns.reduce((acc, next) => next(acc), args)
);
