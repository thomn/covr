#!/usr/bin/env node

process.env.NODE_ENV = 'production';

require('./dist/apps/covr/index')
    .default()
    .catch()
;

for (const signal of ['SIGINT', 'SIGTERM', 'SIGQUIT']) {
    process.on(signal, () => {
        process.exit(0);
    });
}
