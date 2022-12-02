import route from '#/backend/route';
import {database} from '#/backend/modules';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.10.22
 * Time: 12:06
 */
export default route<DI>(async ({version}) => {
    const memory = {};
    const used = process.memoryUsage();
    for (const key in used) {
        memory[key] = `${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`;
    }

    return ({
        version,
        status: 'up',
        database: database().status(),
        uptime: process.uptime(),
        memory,
    });
});
