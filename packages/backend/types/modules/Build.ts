export type LegacyVersion = {
    complete: string,
    major?: string,
    minor?: string,
    patch?: string
};

export type LegacyBuild = {
    parse (): LegacyVersion,
};
