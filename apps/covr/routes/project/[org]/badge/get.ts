import route from '#/backend/route';
import {getLatestCoveragesByOrg} from '#/backend/models';
import coverage from '#/backend/modules/badge/coverage';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.09.22
 * Time: 19:03
 */
export default route(async ({context}) => {
    const req = context.getParam<{ org: string }>();
    const entries = await getLatestCoveragesByOrg(req);
    if (!entries || entries.length === 0) {
        return coverage();
    }

    const coverages = entries.map(({coverage}) => coverage);
    const sum = coverages.reduce((acc, coverage) => acc + coverage, 0);
    const avg = (sum / coverages.length) || 0;

    return coverage({
        coverage: avg,
    });
});
