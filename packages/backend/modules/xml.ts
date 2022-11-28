import type {XML} from '#/backend/types/modules';

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
    const iterate = (steps: string[]): Map<string, string> => {
        let attributes: Map<string, string>;

        while (steps.length) {
            const [name, index] = steps.shift().split(':');

            attributes = find(name, ~~index, 0);
        }

        return attributes;
    };

    /**
     *
     * @param name
     * @param index
     * @param level
     */
    const find = (name: string, index: number, level = 0): Map<string, string> => {
        const matches = REGEX_ELEMENT.exec(string);
        if (!matches) {
            return null;
        }

        const [element] = matches;
        const [tag] = REGEX_TAG.exec(element);

        if (tag === name) {
            if (index == level) {
                return Array.from(element.matchAll(REGEX_ATTR))
                    .reduce((acc, [, key, value]) => (
                        (acc.set(key, value)) && acc
                    ), new Map())
                ;
            } else if (index < level) {
                return null;
            }

            ++level;
        }

        return find(name, index, level);
    };

    /**
     *
     * @param path
     */
    const pick = (path: string): Record<string, any> => {
        const steps = path.split(/\/|(#)/)
            .filter(Boolean)
        ;

        return Array.from(iterate(steps))
            .reduce((acc, [key, value]) => (acc[key] = value) && acc, {})
    };

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
