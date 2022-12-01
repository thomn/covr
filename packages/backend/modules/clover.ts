import {XMLParser} from 'fast-xml-parser';
import {traverse} from '#/backend/utils';

/**
 *
 * @param string
 */
const factory = (string: string) => {
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
    });

    /**
     *
     */
    const coverage = (): number => {
        const document = parser.parse(string);

        const {
            coveredconditionals,
            coveredstatements,
            coveredmethods,
            conditionals,
            statements,
            methods,
        } = traverse<{
            coveredconditionals: string,
            coveredstatements: string,
            coveredmethods: string,
            conditionals: string,
            statements: string,
            methods: string,
        }>(document, 'coverage.project.metrics');

        return (~~coveredconditionals + ~~coveredstatements + ~~coveredmethods) / (~~conditionals + ~~statements + ~~methods);
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
