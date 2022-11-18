import {createElement, memo} from 'react';

/**
 *
 * @param children
 * @param contexts
 * @constructor
 */
const Contexts = ({children, contexts}) => (
    contexts.reduceRight((acc, [context, props]) => (
        createElement(context, props, acc)
    ), children)
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.11.22
 * Time: 07:18
 */
export default memo(Contexts);
