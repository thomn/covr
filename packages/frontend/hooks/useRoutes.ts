import {useContext} from 'react';
import {Context as Routes} from '#/frontend/contexts/Routes';
import type {Route} from '#/frontend/types/contexts/Routes';

type Context = {
    routes: (Route & { [key: string]: unknown })[],
    current: string,
    update: (string: string) => void,
    register: (route: Route & { [key: string]: unknown }) => void,
    remove: (string: string) => void
}

/**
 *
 */
const useRoutes = (): Context => (
    useContext(Routes)
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 17.03.2022
 * Time: 17:29
 */
export default useRoutes;
