import {resolve} from 'path';
import {renderer} from '#/modules';

const PADDING = 5;
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const TABLE = 'AADqDqDqDqDqDqDqAAD3D3D3D3D3DqDqDqDqDqDqDqDqDqDqDqDqDqDqDqAADqDqD3EVFDJAG/L1H/C9E/E/G/JAEAE/EAE/G/G/G/G/G/G/G/G/G/G/E/E/JAJAJAF/LAHhHiHrIeG9GUIhIREoFAHnGHJRIOIqGoIqHpHhGxIDHhK4HiGxHiE/E/E/JAG/G/GmG2FuG2GjD3G2G9DBDyGgDBKsG9GrG2G2EsFuEVG9GgJAGgGgFxG+E/G+JAAA';

/**
 *
 * @param key
 * @param value
 * @param color
 */
const factory = ({key, value, color = '#4c1'}) => {
    const base64codes = {};
    for (let index = 0; index < CHARS.length; index++) {
        base64codes[CHARS[index]] = index;
    }

    /**
     *
     * @param str
     */
    const base64ToFloat = (str: string): number => {
        const integer = base64codes[str[0]];
        const fract64 = base64codes[str[1]];
        const fractional = fract64 / 64;

        return integer + fractional;
    };

    /**
     *
     * @param char
     */
    const find = (char: string): number => {
        const code = char.charCodeAt(0);
        const start = 0;
        const end = start + TABLE.length / 2;

        if (start <= code && code <= end) {
            const pos = (code - start) * 2;

            return base64ToFloat(TABLE.slice(pos, pos + 2));
        }
    };

    /**
     *
     * @param string
     */
    const calculateWidth = (string: string): number => (
        Array.from(string)
            .reduce((acc, item) => acc + (find(item) || 0), 0)
    );

    const leftWidth = calculateWidth(key);
    const rightWidth = calculateWidth(value);

    const resources = resolve(process.cwd(), 'src/resources');
    const file = resolve(resources, 'badges/flat.svg');

    return renderer(file).render({
        leftWidth: Math.ceil(leftWidth),
        rightWidth: Math.ceil(rightWidth),
        padding: PADDING,
        key,
        value,
        color,
    });
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.09.22
 * Time: 19:06
 */
export default factory;
