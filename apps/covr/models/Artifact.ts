import {Document, model, Schema, Model} from 'mongoose';

export interface IArtifact extends Document {
    type: string;
    reference: string,
}

const ArtifactSchema = new Schema<IArtifact>({
    type: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
        required: true,
    },
});

const ArtifactModel: Model<IArtifact> = model<IArtifact>('artifact', ArtifactSchema);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 16.12.22
 * Time: 13:29
 */
export default ArtifactModel;
