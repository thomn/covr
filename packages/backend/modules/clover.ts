import {XMLParser} from 'fast-xml-parser';

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
     * @param key
     * @param subject
     * @param collected
     */
    const collect = (key: string, subject: object, collected: object[] = []): object[] => {
        for (const [_key, value] of Object.entries(subject)) {
            if (key == _key) {
                collected.push(value);
            } else {
                if (typeof value === 'object' && !Array.isArray(value)) {
                    collect(key, value, collected);
                }
            }
        }

        return collected;
    };

    /**
     *
     */
    const coverage = (): number => {
        const document = parser.parse(string);
        const metrics = collect('metrics', document);

        let statements = 0;
        let methods = 0;
        let elements = 0;
        let coveredStatements = 0;
        let coveredMethods = 0;
        let coveredElements = 0;

        for (const metric of metrics) {
            statements += parseInt(metric['statements']);
            methods += parseInt(metric['methods']);
            elements += parseInt(metric['elements']);
            coveredStatements += parseInt(metric['coveredstatements']);
            coveredMethods += parseInt(metric['coveredmethods']);
            coveredElements += parseInt(metric['coveredelements']);
        }

        return (coveredStatements + coveredMethods + coveredElements) / (statements + methods + elements);
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
