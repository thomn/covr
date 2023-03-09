import {resolve} from 'path';
import {mkdirSync, rmSync} from 'fs';

/**
 *
 * @param namespace
 */
export const prepare = (namespace: string) => {
    const path = resolve(__dirname, 'temp', namespace);

    try {
        rmSync(path, {
            recursive: true,
            force: true,
        });
    } catch (e) {
        //
    }

    mkdirSync(path, {
        recursive: true,
    });

    return path;
};
