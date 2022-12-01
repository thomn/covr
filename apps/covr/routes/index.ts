/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 01.12.22
 * Time: 10:50
 */
export default (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    return next();
};
