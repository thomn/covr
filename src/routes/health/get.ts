import route from '#/route';
import {database} from '#/modules';

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 28.10.22
 * Time: 12:06
 */
export default route(async () => {
    const memory = {};
    const used = process.memoryUsage();
    for (const key in used) {
        memory[key] = `${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`;
    }

    return ({
        status: 'up',
        database: database().status(),
        uptime: process.uptime(),
        memory,
    });
});
