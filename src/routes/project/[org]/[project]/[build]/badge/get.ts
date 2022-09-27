import route from '#/route';
import {Coverage} from '#/models';
import {badge} from '#/modules';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.09.22
 * Time: 19:03
 */
export default route(async ({context}) => {
    const req = context.getParam<{ org: string, project: string, build: string }>();
    const entry = await Coverage.findOne(req);
    if (!entry) {
        return null;
    }

    const key = 'coverage';
    const value = String((entry.coverage * 100).toFixed(0)) + '%';

    return badge({
        key,
        value,
        color: '#4c1',
    });
});
