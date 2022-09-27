import {Document, model, Schema} from 'mongoose';

export interface ICoverage extends Document {
    org: string,
    project: string,
    build: string,
    coverage: number,
    date: Date,
}

export const CoverageSchema = new Schema<ICoverage>({
    org: {
        type: String,
        required: true,
    },
    project: {
        type: String,
        required: true,
    },
    build: {
        type: String,
        required: true,
    },
    coverage: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 26.09.22
 * Time: 22:22
 */
export default model('coverage', CoverageSchema);
