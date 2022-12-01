import route from '#/backend/route';
import {clover, build} from '#/backend/modules';
import Coverage from '#/covr/models/coverage';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.09.22
 * Time: 19:02
 */
export default route(async ({context}) => {
    const text = await context.text();
    const {body: coverage} = text.get('coverage');
    const {body: data} = text.get('data');
    const {org, project, build: buildString, commit, committer} = JSON.parse(data);

    const model = new Coverage({
        org,
        project,
        build: build(buildString).parse(),
        commit,
        committer,
        document: coverage,
        coverage: clover(coverage).coverage(),
    });

    await model.save();

    return model;
});
