import {createServer, IncomingMessage, Server, ServerResponse} from 'http';
import {ReadStream, statSync} from 'fs';
import {capture} from '#/backend/debug';

const ContentType = {
    TEXT: 'text/plain',
    HTML: 'text/html; charset=UTF-8',
    JSON: 'application/json; charset=utf-8',
    STREAM: 'application/octet-stream',
    SVG: 'image/svg+xml',
};

/**
 *
 * @param name
 * @param version
 */
const factory = (name: string, version: string) => {
    /**
     *
     * @param res
     * @param code
     * @param data
     */
    const send = (res: ServerResponse, code: number, data = null): void => {
        if (res.headersSent) {
            return;
        }

        let type = ContentType.TEXT;
        let length = (data && data.length) | 0;

        if (data == null) {
            //
        } else if (typeof data === 'string') {
            if (data.trim().startsWith('<svg')) {
                type = ContentType.SVG;
            }
        } else if (Buffer.isBuffer(data)) {
            type = ContentType.STREAM;
            length = data.length;
        } else if (data instanceof ReadStream) {
            const {size} = statSync(data.path);

            type = ContentType.STREAM;
            length = size;
        } else if (typeof data !== 'string') {
            data = JSON.stringify(data, null, 2);

            type = ContentType.JSON;
            length = Buffer.byteLength(data);
        }

        res.statusCode = code;
        res.setHeader('Content-Type', type);
        res.setHeader('Content-Length', length);

        if (data instanceof ReadStream) {
            data.pipe(res);
        } else {
            res.end(data);
        }
    };

    /**
     *
     * @param fn
     */
    const serve = (fn: (req: IncomingMessage, res: ServerResponse) => Promise<any>) => {
        const server: Server = createServer((req, res) => {
            /**
             *
             * @param subject
             */
            const onResolve = (subject: unknown) => {
                const {method} = req;
                let status = 200;

                if (method === 'GET') {
                    if (!subject) {
                        status = 404;
                    }
                } else if (method === 'POST' || method === 'PUT') {
                    status = (!subject)
                        ? 204
                        : 201;
                }

                return send(res, status, subject);
            };

            /**
             *
             * @param err
             */
            const onReject = (err) => {
                capture(err);
                console.error(err);

                send(res, 500);
            };

            return fn(req, res)
                .then(onResolve)
                .catch(onReject);
        });

        /**
         *
         * @param port
         */
        const listen = async (port: string | number): Promise<void> => (
            new Promise((resolve) => (
                server.listen(port, () => {
                    console.info(`> ${name}:${version} listening on port ${port}`);

                    resolve();
                })
            ))
        );

        /**
         *
         */
        const close = async (): Promise<void> => (
            new Promise((resolve, reject) => (
                server.close((err) => {
                    (err)
                        ? reject(err)
                        : resolve();
                })
            ))
        );

        return {
            listen,
            close,
        };
    };

    return {
        serve,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 18.11.2021
 * Time: 16:22
 */
export default factory;
