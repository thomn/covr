import {connect, connection, STATES} from 'mongoose';

/**
 *
 */
const factory = () => {
    /**
     *
     */
    const init = (dsn: string) => {
        return connect(dsn);
    };

    /**
     *
     */
    const status = () => {
        return STATES[connection.readyState];
    };

    return {
        init,
        status,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 07.09.22
 * Time: 19:58
 */
export default factory;
