import type {XML} from '#/backend/types/modules';
import {pipe} from '#/backend/utils';

const REGEX_ELEMENT = /<\/?[^>]+>/g;
const REGEX_ATTR = /(\w+)="(.*?)"/g;
const REGEX_TAG = /[.*]?([a-zA-Z0-9]+)/;

/**
 *
 * @param clover
 */
const factory = (clover: string): XML => {
    const string = clover.replace(/\r?\n|\r/g, '');

    //drop xml header
    REGEX_ELEMENT.exec(string);

    /**
     *
     * @param steps
     */
    const iterate = (steps: string[]): [string, string][] => {
        let attributes: Map<string, string>;

        /**
         *
         * @param element
         */
        const extract = (element: string) => pipe(
            (element: string) => element.matchAll(REGEX_ATTR),
            (matches: RegExpMatchArray[]) => Array.from(matches),
            (matches: [string, string, string][]) => matches.map((entry) => entry.slice(1)),
            (matches: Iterable<readonly [string, string]>) => new Map(matches),
        )(element) as Map<string, string>;

        while (steps.length) {
            const [name, index] = steps.shift()
                .split(':')
            ;

            let iteration = 0;
            do {
                iteration = find(name, ~~index, iteration, (element) => {
                    attributes = extract(element);
                });
            } while (iteration != undefined);
        }

        return Array.from(attributes);
    };

    /**
     *
     * @param name
     * @param index
     * @param iteration
     * @param callback
     */
    const find = (name: string, index: number, iteration = 0, callback: (element: string) => void): number => {
        const matches = REGEX_ELEMENT.exec(string);
        if (!matches) {
            return null;
        }

        const [element] = matches;
        const [tag] = REGEX_TAG.exec(element);

        if (tag === name) {
            if (index === iteration) {
                callback(element);

                return null;
            } else if (index < iteration) {
                return null;
            }

            ++iteration;
        }

        return iteration;
    };

    /**
     *
     * @param path
     */
    const pick = (path: string): Record<string, string> => (
        pipe(
            (path) => path.split(/\//),
            (steps: string[]) => steps.filter(Boolean),
            (steps: string[]) => iterate(steps),
            (steps: [string, string][]) => steps.reduce((acc, [key, value]) => (acc[key] = value) && acc, {}),
        )(path) as Record<string, string>
    );

    return {
        pick,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 26.09.22
 * Time: 20:06
 */
export default factory;
