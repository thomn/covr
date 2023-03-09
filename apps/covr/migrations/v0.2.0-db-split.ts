import {resolve} from 'path';
import {model} from 'mongoose';
import {CoverageSchema} from '#/covr/models';
import Artifact from '#/covr/models/Artifact';
import {artifact, build} from '#/backend/modules';
import {ICoverage} from '#/covr/models';

type SurrogateType = ICoverage & {
    build: {
        complete: string,
        major: string,
        minor: string,
        patch: string,
    },
    document: string,
}
const SurrogateModel = model<SurrogateType>('coverage', CoverageSchema);

export async function up () {
    const coverages = await SurrogateModel.find();
    const path = resolve(__dirname, '..', '..', '..');
    const outputs = artifact(path, 'outputs');

    // for (const coverage of coverages) {
    //     coverage.build = build(coverage.build.complete).parse();
    //
    //     const document = outputs.link(coverage.document);
    //     const entry = new Artifact({
    //         type: 'xml',
    //         reference: document,
    //     });
    //
    //     coverage.output = entry._id;
    //
    //     await entry.save();
    //     await coverage.save();
    // }

    // CoverageModel.updateMany({}, {$unset: {'document': 1}});
}

export async function down () {
    console.info('down');
}
