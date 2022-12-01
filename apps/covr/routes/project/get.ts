import route from '#/backend/route';
import {getOrgs} from '#/covr/models';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 04.11.22
 * Time: 11:05
 */
export default route(() => getOrgs());
