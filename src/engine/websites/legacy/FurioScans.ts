// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './FurioScans.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('furioscans', `Furio Scans`, 'https://furioscans.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class FurioScans extends WordPressMadara {

    constructor() {
        super();
        super.id = 'furioscans';
        super.label = 'Furio Scans';
        this.tags = [ 'webtoon', 'portuguese' ];
        this.url = 'https://furioscans.com';
    }
}
*/