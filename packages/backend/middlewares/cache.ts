import type {Middleware} from '#/backend/types';

/**
 *
 */
const factory = ({seconds = 60}: {seconds: number}): Middleware => {
    return (req, res, next) => {
        res.setHeader('Cache-control', 'public, max-age=' + seconds);

        return next();
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.09.22
 * Time: 18:07
 */
export default factory;
