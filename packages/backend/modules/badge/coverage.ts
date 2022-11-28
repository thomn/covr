import {badge} from '#/backend/modules';

/**
 *
 * @param percentage
 */
const factory = async ({coverage} = {coverage: null}) => {
    /**
     *
     * @param value
     */
    const getSeverityColor = (value: number): string => {
        const hue = ((1 - value) * 104).toString(10);

        return `hsl(${hue},85%,43%)`;
    };

    let value = 'n/a';
    let color = getSeverityColor(1);

    if (coverage != null) {
        value = `${(coverage * 100).toFixed(0)}%`;
        color = getSeverityColor((coverage - 1) * -1);
    }

    return badge({
        key: 'coverage',
        value,
        color,
    });
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 11.11.22
 * Time: 09:28
 */
export default factory;
