import assert from 'assert';
import {version} from '#/backend/modules';

describe('version', () => {
    it('should parse version accordingly', () => {
        const {normalized, original} = version('1.2.3').parse();

        assert.equal(normalized, '001.002.0003');
        assert.equal(original, '1.2.3');
    });

    it('should bail early and return null', () => {
        assert.equal(version('1.foobar.3').parse(), null);
        assert.equal(version().parse(), null);
    });
});
