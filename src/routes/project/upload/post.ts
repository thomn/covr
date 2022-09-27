import route from '#/route';
import {clover} from '#/modules';
import Coverage from '#/models/coverage';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.09.22
 * Time: 19:02
 */
export default route(async ({context}) => {
    const data = await context.text();
    const {body: coverage} = data.get('coverage');
    const {body: org} = data.get('org');
    const {body: project} = data.get('project');
    const {body: build} = data.get('build');

    const model = new Coverage({
        org,
        project,
        build,
        coverage: clover(coverage).coverage(),
        date: new Date(),
    });

    await model.save();

    return model;
});
