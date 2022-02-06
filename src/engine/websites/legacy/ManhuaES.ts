// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './ManhuaES.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('manhuaes', `ManhuaES`, 'https://manhuaes.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class ManhuaES extends WordPressMadara {

    constructor() {
        super();
        super.id = 'manhuaes';
        super.label = 'ManhuaES';
        this.tags = [ 'manga', 'english' ];
        this.url = 'https://manhuaes.com';

        this.queryPages = 'figure source, div.page-break source';
    }
}
*/