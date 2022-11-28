import {xml} from './index';

/**
 *
 * @param string
 */
const factory = (string: string) => {
    const {pick} = xml(string);

    /**
     *
     */
    const coverage = (): number => {
        const {
            coveredconditionals,
            coveredstatements,
            coveredmethods,
            conditionals,
            statements,
            methods,
        } = pick('coverage:0/project:0/metrics:0');

        return (coveredconditionals + coveredstatements + coveredmethods) / (conditionals + statements + methods);
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
