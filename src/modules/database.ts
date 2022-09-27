import {connect} from 'mongoose';

/**
 *
 * @param dsn
 */
const factory = (dsn: string) => {

    /**
     *
     */
    const init = () => {
        return connect(dsn);
    };

    return {
        init,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 07.09.22
 * Time: 19:58
 */
export default factory;
