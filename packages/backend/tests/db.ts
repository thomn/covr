import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';

const factory = () => {
    let mongo: MongoMemoryServer;

    /**
     *
     */
    const connect = async () => {
        mongo = await MongoMemoryServer.create();
        const mongoUri = mongo.getUri();

        await mongoose.connect(mongoUri);
    };

    /**
     *
     */
    const cleanup = async () => {
        const collections = await mongoose.connection.db.collections();

        for (const collection of collections) {
            await collection.deleteMany({});
        }
    };

    /**
     *
     */
    const disconnect = async () => {
        await mongo.stop();
        await mongoose.connection.close();
    };

    return {
        mongoose,
        connect,
        cleanup,
        disconnect,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 05.12.22
 * Time: 06:53
 */
export default factory;
