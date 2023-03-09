import {mkdirSync, readFileSync, unlinkSync, writeFileSync} from 'fs';
import {join} from 'path';

const CHARS = 'abcdefABCDEF0123456789';

/**
 *
 * @param namespace
 * @param root
 */
const factory = (namespace: string, root: string) => {
    const path = join(root, namespace);

    /**
     *
     */
    const generateId = (): string => {
        return [...Array(16)].map(Math.random)
            .map((n) => ~~(n * 100))
            .map((n) => CHARS[n % CHARS.length])
            .join('');
    };

    /**
     *
     * @param content
     */
    const link = (content: string) => {
        mkdirSync(path, {
            recursive: true,
        });

        const id = generateId();

        const cursor = join(path, id);
        writeFileSync(cursor, content);

        return id;
    };

    /**
     *
     * @param id
     */
    const unlink = (id: string) => {
        const cursor = join(path, id);

        return unlinkSync(cursor);
    };

    const read = (id: string) => {
        const cursor = join(path, id);

        return readFileSync(cursor);
    };

    return {
        link,
        unlink,
        read,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.12.22
 * Time: 09:39
 */
export default factory;
