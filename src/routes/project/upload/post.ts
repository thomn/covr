import route from '#/route';
import {clover} from '#/modules';
import Coverage from '#/models/coverage';
import {parseBuild} from '#/utils';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.09.22
 * Time: 19:02
 */
export default route(async ({context}) => {
    const text = await context.text();
    const {body: coverage} = text.get('coverage');
    const {body: data} = text.get('data');
    const {org, project, build, commit, committer} = JSON.parse(data);

    const model = new Coverage({
        org,
        project,
        build: parseBuild(build),
        commit,
        committer,
        document: coverage,
        coverage: clover(coverage).coverage(),
    });

    await model.save();

    return model;
});
