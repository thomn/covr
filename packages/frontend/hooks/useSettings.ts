import {useContext} from 'react';
import {Context as Settings} from '#/frontend/contexts/Settings';

/**
 *
 * @param namespace
 */
const useSettings = (namespace?: string) => {
    const {get, set, ...rest} = useContext(Settings);

    /**
     *
     * @param fn
     */
    const withNamespace = (fn) => {
        if (!namespace) {
            return fn;
        }

        return (key: string, ...rest) => {
            const cursor = [namespace, key].filter(Boolean)
                .join(':')
            ;

            return fn(cursor, ...rest);
        };
    };

    return {
        get: withNamespace(get),
        set: withNamespace(set),
        ...rest,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.04.2020
 * Time: 16:29
 */
export default useSettings;
