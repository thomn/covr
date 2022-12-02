#!/usr/bin/env node

process.env.NODE_ENV = 'production';

require('./dist/apps/covr/index')
    .default()
    .catch()
;
