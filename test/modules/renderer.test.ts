import {join} from 'path';
import assert from 'assert';
import {renderer} from '../../src/modules';

describe('covr', () => {
    describe('renderer', () => {
        const file = join(process.cwd(), '/src/resources/badges/flat.svg');

        it('should calculate total coverage', (done) => {
            const {render} = renderer(file);

            const badge = render({
                color: 'red',
                key: 'foo',
                value: 'bar',
                leftWidth: '10',
                rightWidth: '20',
                padding: 5,
            });

            assert(badge);
            done();
        });
    });
});
