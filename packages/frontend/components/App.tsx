import React from 'react';
import {Contexts, Themes, Tabs, Routes, Settings} from '#/frontend/contexts';
import {Page} from '#/frontend/components';

/**
 *
 * @constructor
 */
const App = () => (
    <Contexts contexts={[
        [Settings],
        [Themes],
        [Tabs],
        [Routes],
    ]}>
        <Page/>
    </Contexts>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.11.22
 * Time: 07:21
 */
export default App;
