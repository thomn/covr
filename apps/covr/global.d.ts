import {Container} from '#/backend/types';

type Platform = {
}

declare global {
    export type DI = Container & Platform
}

export {};
