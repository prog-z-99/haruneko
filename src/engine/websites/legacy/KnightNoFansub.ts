// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './KnightNoFansub.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('knightnofansub', `Knight no Fansub`, 'https://knightnoscanlation.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class KnightNoFansub extends WordPressMadara {

    constructor() {
        super();
        super.id = 'knightnofansub';
        super.label = 'Knight no Fansub';
        this.tags = [ 'webtoon', 'high-quality', 'spanish', 'scanlation' ];
        this.url = 'https://knightnoscanlation.com';
    }
}
*/