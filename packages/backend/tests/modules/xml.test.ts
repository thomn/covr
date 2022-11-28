import {readFileSync} from 'fs';
import {resolve} from 'path';
import {xml} from '../../modules';
import assert from 'assert';

describe('covr', () => {
    describe('xml', () => {
        const path = resolve(__dirname, '..', 'fixtures', 'small.xml');
        const buffer = readFileSync(path);
        const string = buffer.toString();

        it('should parse access property', (done) => {
            const {pick} = xml(string);
            const {num} = pick('foo:0/bar:1/a:0');
            assert(num === '4');

            done();
        });
    });
});
