import {resolve} from 'path';
import assert from 'assert';
import db from '../db';
import {Direction, getMigrations} from '#/backend/models';
import {migration} from '#/backend/modules';

// describe('migration', () => {
//     const {connect, cleanup, disconnect} = db();
//
//     before(async () => await connect());
//     beforeEach(async () => await cleanup());
//     after(async () => await disconnect());
//
//     const path = resolve(__dirname, '..', 'fixtures', 'migrations');
//
//     describe('sync with folder', async () => {
//         it('should create migrations in db', async () => {
//             await migration(path).sync();
//
//             const migrations = await getMigrations();
//             const [first, second, third, fourth] = migrations;
//
//             assert.deepEqual({...first.version}, {
//                 original: '0.0.1',
//                 normalized: '000.000.0001',
//             });
//             assert.deepEqual({...second.version}, {
//                 original: '0.0.2',
//                 normalized: '000.000.0002',
//             });
//             assert.deepEqual({...third.version}, {
//                 original: '0.1.0',
//                 normalized: '000.001.0000',
//             });
//             assert.deepEqual({...fourth.version}, {
//                 original: '0.2.0',
//                 normalized: '000.002.0000',
//             });
//         });
//     });
//
//     describe('run migration', async () => {
//         it('should create migrations in db', async () => {
//             const {run, sync} = migration(path);
//             await sync();
//
//             let migrated = await run('0.0.2');
//             assert.equal(migrated.length, 2);
//
//             let [first, second] = migrated;
//             assert.equal(first.name, 'first');
//             assert.equal(second.name, 'second');
//
//             migrated = await run('0.1.0');
//             assert.equal(migrated.length, 1);
//
//             let [third] = migrated;
//             assert.equal(third.name, 'third');
//
//             migrated = await run('0.0.1', Direction.DOWN);
//             assert.equal(migrated.length, 3);
//
//             [third, second, first] = migrated;
//             assert.equal(first.name, 'first');
//             assert.equal(second.name, 'second');
//             assert.equal(third.name, 'third');
//         });
//     });
// })
