import {readFileSync} from 'fs';
import {resolve} from 'path';
import assert from 'assert';
import {clover} from '../../modules';

describe('clover', () => {
    const path = resolve(__dirname, '..', 'fixtures', 'xmls', 'clover.xml');
    const buffer = readFileSync(path);
    const string = buffer.toString();

    it('should calculate total coverage', (done) => {
        const {coverage} = clover(string);

        assert(coverage() === 0.5);
        done();
    });
});

