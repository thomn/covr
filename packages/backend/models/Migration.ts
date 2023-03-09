import {model, Model, Schema} from 'mongoose';
import {version} from '#/backend/modules';
import {Version} from '#/backend/types/modules';
import {LATEST, EARLIEST} from '#/backend/models/utils';

export enum Direction {
    DOWN = 'down',
    UP = 'up'
}

export type MigrationFunctions = {
    [Direction.DOWN]: () => Promise<void>,
    [Direction.UP]: () => Promise<void>,
}

export interface IMigration extends Document {
    name: string,
    fileName: string,
    applied: boolean,
    version: Version,
    state: Direction,
}

const MigrationSchema = new Schema<IMigration>({
    name: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    applied: {
        type: Boolean,
        required: true,
        default: false,
    },
    version: {
        original: {
            type: String,
            required: true,
        },
        normalized: {
            type: String,
            required: true,
        },
    },
    state: {
        type: String,
        enum: Direction,
        default: Direction.DOWN,
        required: true,
    },
}, {
    collection: 'migration',
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.id;
            delete ret.__v;

            return ret;
        },
    },
});

MigrationSchema.virtual('filename').get(function () {
    return `${this.version.original}-${this.name}.js`;
});

const MigrationModel: Model<IMigration> = model<IMigration>('migration', MigrationSchema);

/**
 *
 */
export const getMigrations = async () => (
    MigrationModel.find({})
        .sort('version.normalized')
);

/**
 *
 * @param migration
 * @param direction
 */
export const updateMigrations = async (migration: IMigration, direction: Direction) => {
    return MigrationModel.where({name: migration.name})
        .updateMany({$set: {state: direction}})
    ;
};

/**
 *
 * @param normalized
 * @param direction
 */
export const getMigrationsTill = async (normalized: string, direction: Direction) => {
    const query = {
        'version.normalized': {
            [(direction == Direction.DOWN)
                ? '$gte'
                : '$lte'
            ]: normalized,
        },
        state: (direction == Direction.DOWN)
            ? Direction.UP
            : Direction.DOWN,
    };

    const sort = (direction === Direction.UP)
        ? EARLIEST
        : LATEST
    ;

    return MigrationModel.find(query)
        .sort({'version.normalized': sort})
    ;
}

/**
 *
 */
export const getLatestMigration = async () => {
    return MigrationModel.findOne().sort({
        'version.normalized': LATEST,
    });
};

/**
 *
 * @param original
 * @param name
 * @param fileName
 */
export const insertMigration = (original: string, name: string, fileName: string) => {
    return MigrationModel.create({
        version: version(original).parse(),
        name,
        fileName,
    });
};
