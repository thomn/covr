import {Context} from './Context';
import type {Request} from 'fsbr';

export type Resolvable = (fn: (
    {
        context,
        req,
    }: Partial<{
        context: Context,
        req: Request
    }>,
) => Promise<any> | any) => unknown;
