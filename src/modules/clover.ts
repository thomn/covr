import {xml} from '#/modules/index';

/**
 *
 * @param string
 */
const factory = (string: string) => {
    const {pick} = xml(string).parse();

    /**
     *
     */
    const coverage = (): number => {
        const attr = pick('coverage/0/project/0/metrics/0#');
        const coveredConditionals = ~~attr.get('coveredconditionals');
        const coveredStatements = ~~attr.get('coveredstatements');
        const coveredMethods = ~~attr.get('coveredmethods');
        const conditionals = ~~attr.get('conditionals');
        const statements = ~~attr.get('statements');
        const methods = ~~attr.get('methods');

        return (coveredConditionals + coveredStatements + coveredMethods) / (conditionals + statements + methods);
    };

    return {
        coverage,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 26.09.22
 * Time: 20:07
 */
export default factory;
