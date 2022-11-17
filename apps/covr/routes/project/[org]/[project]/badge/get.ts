import route from '#/backend/route';
import {getLatestCoverageBySemVer} from '#/backend/models';
import coverage from '#/backend/modules/badge/coverage';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.09.22
 * Time: 19:03
 */
export default route(async ({context}) => {
    const req = context.getParam<{ org: string, project: string }>();
    const entry = await getLatestCoverageBySemVer(req);
    if (!entry) {
        return coverage();
    }

    return coverage(entry);
});
