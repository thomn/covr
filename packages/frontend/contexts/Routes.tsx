import React, {createContext, memo, useLayoutEffect, useState} from 'react';
import {useSettings, useTabs} from '#/frontend/hooks';
import {Route} from '#/frontend/types/contexts';

export const Context = createContext(null);
const {Provider} = Context;

/**
 *
 * @param children
 * @constructor
 */
const Routes = ({children}) => {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [current, setCurrent] = useState<string>();
    const {get, set} = useSettings('router');
    const tabs = useTabs();

    /**
     *
     * @param route
     */
    const register = (route: Route & object) => {
        if (routes.find(({path}) => path === route.path)) {
            return;
        }

        setRoutes((prev) => [
            ...prev,
            route,
        ]);
    };

    /**
     *
     * @param path
     */
    const remove = (path: string) => {
        setRoutes((prev) => {
            return prev.filter((screen) => screen.path !== path);
        });
    };

    /**
     *
     * @param path
     */
    const update = (path: string) => {
        if (!path) {
            return;
        }

        let tab;
        [path, tab] = path.split('#');

        if (current === path) {
            path = null;
        }

        set('route', path);
        setCurrent(path);
        tab && tabs.push(tab);
    };

    const value = {
        routes,
        current,
        register,
        remove,
        update,
    };

    useLayoutEffect(() => {
        const path = get('route');
        update(path);
    }, []);

    return (
        <Provider value={value}>
            {children}
        </Provider>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.03.2022
 * Time: 17:03
 */
export default memo(Routes);
