import {Context} from './Context';
import type {Request, Response} from 'fsbr';

export type Container = {
    context: Context,
    req: Request,
    res: Response,
}

export type Resolve<T> = ((obj: Container & T) => Promise<unknown> | unknown);
