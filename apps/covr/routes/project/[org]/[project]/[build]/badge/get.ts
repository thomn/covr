import route from '#/backend/route';
import {getLatestCoverageByDate} from '#/backend/models';
import coverage from '#/backend/modules/badge/coverage';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.09.22
 * Time: 19:03
 */
export default route(async ({context}) => {
    const req = context.getParam<{ org: string, project: string, build: string }>();
    const entry = await getLatestCoverageByDate(req);
    if (!entry) {
        return coverage();
    }

    return coverage(entry);
});
