import React from 'react';
import {ThemeProvider, BaseStyles} from '@primer/react';

/**
 *
 * @param children
 * @constructor
 */
const Themes = ({children}) => (
    <ThemeProvider
        colorMode="auto"
        nightScheme="dark_dimmed"
    >
        <BaseStyles>
            {children}
        </BaseStyles>
    </ThemeProvider>
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.11.22
 * Time: 07:16
 */
export default Themes;

