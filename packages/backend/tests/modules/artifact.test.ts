import {readFileSync, existsSync} from 'fs';
import {resolve} from 'path';
import assert from 'assert';
import {artifact} from '../../modules';
import {prepare} from '#/backend/tests/utils';

describe('artifact', () => {
    const path = prepare('storage');
    const string = JSON.stringify({foo: 'bar'});

    it('should link file', (done) => {
        const instance = artifact('test', path);
        const id = instance.link(string);

        const content = readFileSync(resolve(path, 'test', id));
        assert.equal(content.toString(), string);

        done();
    });

    it('should unlink file', (done) => {
        const instance = artifact('test', path);
        const id = instance.link(string);
        const cursor = resolve(path, 'test', id);

        assert.equal(existsSync(cursor), true);

        instance.unlink(id);
        assert.equal(existsSync(cursor), false);

        done();
    });

    it('should read file content', (done) => {
        const instance = artifact('test', path);
        const id = instance.link(string);

        assert.equal(instance.read(id), string);

        done();
    });
});

