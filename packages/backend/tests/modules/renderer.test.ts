import {join} from 'path';
import assert from 'assert';
import {renderer} from '../../modules';

describe('renderer', () => {
    const file = join(process.cwd(), '/tests/fixtures/svgs/vector.svg');

    it('should render badge', (done) => {
        const {render} = renderer(file);
        const badge = render({
            x: 2,
            color_one: 'red',
            color_two: 'blue',
            color_three: 'green',
            width: 10,
            height: 10,
        });

        assert(badge === '<?xml version="1.0"?>\n' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">\n' +
            '    <g style="fill-opacity:0.7; stroke:black; stroke-width:0.1cm;">\n' +
            '        <circle cx="6" cy="2cm" r="100" style="fill:red;" transform="translate(0,50)"/>\n' +
            '        <circle cx="6" cy="2cm" r="100" style="fill:blue;" transform="translate(70,150)"/>\n' +
            '        <circle cx="6" cy="2cm" r="100" style="fill:green;" transform="translate(-70,150)"/>\n' +
            '    </g>\n' +
            '</svg>\n');
        done();
    });
});
