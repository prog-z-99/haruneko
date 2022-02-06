// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './Anisamanga.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('anisamanga', `Anisa manga`, 'https://anisamanga.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class Anisamanga extends WordPressMadara {

    constructor() {
        super();
        super.id = 'anisamanga';
        super.label = 'Anisa manga';
        this.tags = [ 'manga', 'webtoon', 'turkish' ];
        this.url = 'https://anisamanga.com';
    }
}
*/