import React, {createContext, memo, useLayoutEffect, useState} from 'react';

export const Context = createContext(null);
const {Provider} = Context;

/**
 *
 * @param children
 * @param collectors
 * @constructor
 */
const Tabs = ({children}) => {
    const [tabs, setTabs] = useState({});
    const [active, setActive] = useState(undefined);
    const [stack, setStack] = useState([]);

    /**
     *
     * @param path
     */
    const push = (path: string) => {
        setStack([...stack, path]);
    }

    /**
     *
     * @param path
     */
    const open = (path: string) => {
        if (tabs[path] == active) {
            return close();
        }

        setActive(tabs[path]);
    };

    /**
     *
     */
    const close = () => {
        setActive(null);
    };

    /**
     *
     * @param path
     * @param children
     */
    const update = ({path, tab}: { path: string, tab: object }) => {
        setTabs((prev) => {
            const entry = {
                path,
                tab,
            };

            if (Object.keys(prev).length === 0) {
                setActive(entry);
            }

            return {
                [path]: entry,
                ...prev,
            };
        });
    };

    /**
     *
     * @param path
     */
    const remove = (path: string) => {
        setTabs((prev) => {
            delete prev[path];

            return {
                ...prev,
            };
        });
    }

    useLayoutEffect(() => {
        for (const path of stack) {
            open(path);
        }

        setStack([]);
    }, [active]);

    const value = {
        open,
        close,
        update,
        push,
        remove,
        active,
    };

    return (
        <Provider value={value}>
            {children}
        </Provider>
    );
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.07.2022
 * Time: 14:39
 */
export default memo(Tabs);
