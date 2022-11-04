import route from '#/route';
import {getLatestCoverageByDate} from '#/models';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.10.22
 * Time: 18:21
 */
export default route(async ({context}) => {
    const req = context.getParam<{ org: string, project: string, build: string }>();

    return getLatestCoverageByDate(req);
});
