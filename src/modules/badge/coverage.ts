import {getSeverityColor} from '#/utils';
import {badge} from '#/modules';

/**
 *
 * @param percentage
 */
const factory = async ({coverage} = {coverage: null}) => {
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
