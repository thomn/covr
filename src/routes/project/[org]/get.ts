import route from '#/route';
import {getProjectsByOrg} from '#/models';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 04.11.22
 * Time: 10:58
 */
export default route(async ({context}) => {
    const req = context.getParam<{ org: string }>();

    return getProjectsByOrg(req);
});
