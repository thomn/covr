import route from '#/route';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.09.22
 * Time: 19:04
 */
export default route(async ({context}) => {
    return context.getParam<{ org: string, project: string, build: string }>();
});
