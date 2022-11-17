import type {NodeOptions} from '@sentry/node';
import * as Sentry from '@sentry/node';
import config from './config';

config().then(({SENTRY_DSN, NODE_ENV}) => {
    if (!SENTRY_DSN) {
        return;
    }

    const config: NodeOptions = {
        dsn: SENTRY_DSN,
        maxBreadcrumbs: 0,
        environment: NODE_ENV,
    };

    Sentry.init(config);
});

/**
 *
 * @param e
 * @param context
 */
const capture = (e: unknown, context?: unknown): void => {
    console.error(e);

    if (!Sentry.getCurrentHub().getClient()) {
        return;
    }

    Sentry.captureException(e, context);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 25.03.2022
 * Time: 14:01
 */
export {
    capture,
};
