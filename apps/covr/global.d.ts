import {Container} from '#/backend/types';

type Platform = {
    version: string,
}

declare global {
    export type DI = Container & Platform
}

export {};
