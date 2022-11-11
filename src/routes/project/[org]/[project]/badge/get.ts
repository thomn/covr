import route from '#/route';
import {getLatestCoverageBySemVer} from '#/models';
import coverage from '#/modules/badge/coverage';

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
