export type Version = {
    normalized: string,
    original: string,
};

export type Build = {
    parse (): Version,
};
