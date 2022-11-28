export type Version = {
    complete: string,
    major?: string,
    minor?: string,
    patch?: string
};

export type Build = {
    parse (): Version,
};
