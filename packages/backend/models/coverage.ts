import {Document, model, Schema, Model} from 'mongoose';
import {parseBuild} from '#/backend/utils';

export interface ICoverage extends Document {
    org: string,
    project: string,
    build: string,
    document: string,
    commit?: string,
    committer?: string,
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
        complete: {
            type: String,
            required: true,
        },
        major: {
            type: String,
            required: true,
        },
        minor: {
            type: String,
            required: true,
        },
        patch: {
            type: String,
            required: true,
        },
    },
    document: {
        type: String,
        required: true,
    },
    commit: {
        type: String,
        required: false,
    },
    committer: {
        type: String,
        required: false,
    },
    coverage: {
        type: Number,
        required: true,
    },
});

const CoverageModel: Model<ICoverage> = model<ICoverage>('coverage', CoverageSchema);

/**
 *
 * @param req
 */
export const getLatestCoverageByDate = async (req: { org?: string, project?: string, build?: string }) => (
    CoverageModel.findOne({
        org: req.org,
        project: req.project,
        build: parseBuild(req.build),
    })
        .sort({_id: -1})
);

/**
 *
 * @param query
 */
export const getLatestCoverageBySemVer = async (query: { org?: string, project?: string }) => (
    CoverageModel.findOne(query)
        .sort({
            'build.major': -1,
            'build.minor': -1,
            'build.patch': -1,
            _id: -1,
        })
);

/**
 *
 * @param query
 */
export const getLatestCoveragesByOrg = async (query: { org?: string }) => (
    CoverageModel.aggregate([
        {
            $match: query,
        },
        {
            $sort: {
                'build.major': -1,
                'build.minor': -1,
                'build.patch': -1,
                _id: -1,
            },
        },
        {
            $group: {
                '_id': '$project',
                coverage: {$first: '$coverage'},
            },
        },
    ])
);

/**
 *
 * @param query
 */
export const getProjectsByOrg = async (query: { org: string }) => (
    CoverageModel.find(query)
        .distinct('project')
);

/**
 *
 */
export const getOrgs = async () => (
    CoverageModel.distinct('org')
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 26.09.22
 * Time: 22:22
 */
export default CoverageModel;
