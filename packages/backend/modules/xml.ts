import type {Node, XML} from '#/backend/types/modules';

const REGEX_ELEMENT = /<\/?[^>]+>/g;
const REGEX_ATTR = /(\w+)="(.*?)"/g;
const REGEX_TAG = /[.*]?([a-zA-Z0-9]+)/;
const REGEX_LEAF = /.*\/>$/;
const REGEX_END = /^<\/\w+>$/;

/**
 *
 * @param clover
 */
const factory = (clover: string) => {
    const string = clover.replace(/\r?\n|\r/g, '');

    //drop xml header
    REGEX_ELEMENT.exec(string);

    /**
     *
     * @param value
     * @param parent
     */
    const node = (value, parent: Node = undefined): Node => ({
        parent,
        value,
        children: [],
    });

    /**
     *
     * @param context
     */
    const walk = (context: Node = node({tag: '#'})): Node => {
        const matches = REGEX_ELEMENT.exec(string);
        if (!matches) {
            return context;
        }

        const [element] = matches;
        const [tag] = REGEX_TAG.exec(element);
        const attributes = Array.from(element.matchAll(REGEX_ATTR))
            .reduce((acc, [, key, value]) => (
                (acc.set(key, value)) && acc
            ), new Map())
        ;

        if (REGEX_LEAF.test(element)) {
            const leaf = node({tag, attributes}, context);
            context.children.push(leaf);

            return walk(context);
        } else if (REGEX_END.test(element)) {
            return walk(context.parent);
        }

        const child = node({tag, attributes}, context);
        context.children.push(child);

        return walk(child);
    };

    /**
     *
     * @param node
     */
    const defer = (node: Node) => {
        delete node.parent;

        for (const child of node.children) {
            defer(child);
        }
    };

    /**
     *
     */
    const parse = (): XML => {
        const node = walk();
        defer(node);

        /**
         *
         * @param path
         */
        const pick = (path) => (
            path.split(/\/|(#)/)
                .filter(Boolean)
                .reduce((acc: Node, step: string) => {
                    if (Array.isArray(acc)) {
                        return acc[step];
                    } else if (acc instanceof Map) {
                        return acc.get(step);
                    }

                    if (step === '#') {
                        return acc.value.attributes;
                    }

                    return acc.children.filter((node) => node.value.tag === step);
                }, node)
        );

        return {
            pick,
            node,
        };
    };

    return {
        parse,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 26.09.22
 * Time: 20:06
 */
export default factory;
