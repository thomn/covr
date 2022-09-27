import {readFileSync} from 'fs';
import {resolve} from 'path';
import {xml} from '../../src/modules';
import assert from 'assert';

describe('covr', () => {
    describe('xml', () => {
        const path = resolve(__dirname, '..', 'fixtures', 'small.xml');
        const buffer = readFileSync(path);
        const string = buffer.toString();

        it('should parse html', (done) => {
            const {node} = xml(string).parse();

            assert(node.value.tag === '#');
            assert(node.children.length === 1);
            assert(node.children[0].value.tag === 'foo');
            assert(node.children[0].children.length === 2);
            assert(node.children[0].children[0].value.tag === 'bar');
            assert(node.children[0].children[0].children.length === 3);
            assert(node.children[0].children[0].children[0].value.attributes.get('num') === '1');
            assert(node.children[0].children[0].children[1].value.attributes.get('num') === '2');
            assert(node.children[0].children[0].children[2].value.attributes.get('num') === '3');
            assert(node.children[0].children[1].children[0].value.attributes.get('num') === '4');
            assert(node.children[0].children[1].children[1].value.attributes.get('num') === '5');
            assert(node.children[0].children[1].children[2].value.attributes.get('num') === '6');

            done();
        });

        it('should parse access property', (done) => {
            const {pick} = xml(string).parse();
            const num = pick('foo/0/bar/1/a/0#num');
            assert(num === '4');

            done();
        });
    });
});
