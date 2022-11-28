import {Build, Version} from '#/backend/types/modules';

/**
 *
 * @param string
 */
const factory = (string: string): Build => {
    /**
     *
     */
    const parse = (): Version => {
        if (!string) {
            return null;
        }

        const build = {
            complete: string,
        };

        const match = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/.exec(string);
        if (!match) {
            return build;
        }

        return {
            ...build,
            ...match.groups,
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
