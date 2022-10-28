import route from '#/route';
import {database} from '#/modules';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.10.22
 * Time: 12:06
 */
export default route(async () => ({
    status: 'up',
    database: database().status(),
}));
