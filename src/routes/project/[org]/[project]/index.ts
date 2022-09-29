import {cache} from '#/middlewares';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.09.22
 * Time: 18:10
 */
export default cache({seconds: 60 * 60 * 3});
