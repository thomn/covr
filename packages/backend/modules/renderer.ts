import {readFileSync} from 'fs';

const REGEX_PLACEHOLDER = /{{(.*?)}}/g;
const REGEX_VARIABLES = /(\w+)/g;
const REGEX_EXPRESSION = /^(\(.*\))$/;

/**
 *
 * @param file
 */
const factory = (file: string) => {
    const buffer = readFileSync(file);
    let string = buffer.toString();

    /**
     *
     * @param props
     */
    const render = (props: object): string => {
        const matches = Array.from(string.matchAll(REGEX_PLACEHOLDER))
            .map(([full, match]) => [full, match])
        ;

        for (const [placeholder, value] of matches) {
            let input = Array.from(value.matchAll(REGEX_VARIABLES))
                .map(([, match]) => match)
                .filter((variable) => props[variable] != undefined)
                .reduce((acc, variable) => {
                    let subject = props[variable];
                    if (REGEX_EXPRESSION.test(subject)) {
                        subject = '"' + subject + '"';
                    }

                    return (
                        acc.replace(variable, subject)
                    );
                }, value)
            ;

            if (string.indexOf(placeholder) !== -1) {
                if (REGEX_EXPRESSION.test(input)) {
                    input = Function(`return ${input}`)();
                }

                string = string.replace(placeholder, input);
            }
        }

        return string;
    };

    return {
        render,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 27.09.22
 * Time: 19:05
 */
export default factory;
