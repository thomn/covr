const instance = {
    name: undefined,
};

const Color = {
    RESET: '\x1b[0m',
    BRIGHT: '\x1b[1m',
    DIM: '\x1b[2m',
    UNDERSCORE: '\x1b[4m',
    BLINK: '\x1b[5m',
    REVERSE: '\x1b[7m',
    HIDDEN: '\x1b[8m',
};

export const Foreground = {
    BLACK: '\x1b[30m',
    RED: '\x1b[31m',
    GREEN: '\x1b[32m',
    YELLOW: '\x1b[33m',
    BLUE: '\x1b[34m',
    MAGENTA: '\x1b[35m',
    CYAN: '\x1b[36m',
    WHITE: '\x1b[37m',
    CRIMSON: '\x1b[38m',
};

export const Background = {
    BLACK: '\x1b[40m',
    RED: '\x1b[41m',
    GREEN: '\x1b[42m',
    YELLOW: '\x1b[43m',
    BLUE: '\x1b[44m',
    MAGENTA: '\x1b[45m',
    CYAN: '\x1b[46m',
    WHITE: '\x1b[47m',
    CRIMSON: '\x1b[48m',
};

/**
 *
 * @param namespace
 */
const factory = (namespace: string) => {
    const print = console.info.bind(console);

    /**
     *
     * @param namespace
     */
    const getColor = (namespace: string) => {
        const checksum = namespace.split('')
            .map((char) => char.codePointAt(0))
            .reduce((acc, n) => acc + n, 0)
        ;
        const index = checksum % (Object.keys(Foreground).length - 1);

        return Object.keys(Foreground)[index];
    };

    /**
     * @param message
     * @param foreground
     * @param background
     */
    return (message: string, foreground?: keyof typeof Foreground, background: keyof typeof Background = 'BLACK') => {
        if (!instance.name) {
            return;
        }

        print(
            Foreground[foreground || getColor(namespace)],
            Background[background],
            `> ${instance.name}:${namespace} ${message}`,
            Color.RESET,
        );
    };
};

/**
 *
 * @param name
 */
export const register = (name: string) => {
    instance.name = name;
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.12.22
 * Time: 09:58
 */
export default factory;
