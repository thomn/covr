import React, {useContext} from 'react';
import {Context as Tabs} from '#/frontend/contexts/Tabs';

type Context = {
    open: (path: string) => void,
    active: {
        path: string,
        tab: React.FunctionComponent
    },
    update: ({path, tab}: { path: string, tab: React.FunctionComponent }) => void,
    remove: (path: string) => void,
    push: (path: string) => void,
}

/**
 *
 */
const useTabs = (): Context => (
    useContext(Tabs)
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.07.2022
 * Time: 14:40
 */
export default useTabs;
