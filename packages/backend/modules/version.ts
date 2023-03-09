import {Build, Version} from '#/backend/types/modules';

/**
 *
 * @param string
 */
const factory = (string?: string): Build => {
    /**
     *
     */
    const parse = (): Version => {
        if (!string) {
            return null;
        }

        const match = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/.exec(string);
        if (!match) {
            return null;
        }

        const {groups: {major, minor, patch}} = match;
        const normalized = [
            ('000' + major).slice(-3),
            ('000' + minor).slice(-3),
            ('0000' + patch).slice(-4),
        ].join('.')

        return {
            normalized,
            original: string,
        };
    };

    return {
        parse,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.11.22
 * Time: 10:25
 */
export default factory;
