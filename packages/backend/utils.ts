/**
 *
 * @param value
 */
export const getSeverityColor = (value: number): string => {
    const hue = ((1 - value) * 104).toString(10);

    return `hsl(${hue},85%,43%)`;
};

/**
 *
 * @param string
 */
export const parseBuild = (string: string): { complete: string, major?: string, minor?: string, patch?: string } => {
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
}
