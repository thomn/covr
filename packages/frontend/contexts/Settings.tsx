import React, {createContext, memo, useEffect, useState} from 'react';
import {useLocalStorage} from '#/frontend/hooks';

export const Context = createContext(null);
const {Provider} = Context;

/**
 *
 * @param children
 * @param initial
 * @constructor
 */
const Settings = ({children, ...initial}) => {
    const localStorage = useLocalStorage('settings');
    const [settings, setSettings] = useState({
        ...initial,
    });

    /**
     *
     * @param key
     */
    const get = (key: string) => {
        return localStorage.load(key);
    };

    /**
     *
     * @param key
     * @param value
     */
    const set = (key: string, value: string | number | boolean) => {
        localStorage.save(key, value);

        setSettings({
            ...settings,
            [key]: value,
        });
    };

    const value = {
        ...settings,
        get,
        set,
    };

    useEffect(() => {
        if (!localStorage) {
            return;
        }

        setSettings({
            ...settings,
        });
    }, []);

    return (
        <Provider value={value}>
            {children}
        </Provider>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 19.01.2020
 * Time: 17:13
 */
export default memo(Settings);
