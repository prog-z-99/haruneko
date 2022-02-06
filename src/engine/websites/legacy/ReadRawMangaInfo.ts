// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './ReadRawMangaInfo.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('readrawmangainfo', `ReadRawManga (Info)`, 'https://readrawmanga.info' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class ReadRawMangaInfo extends WordPressJarida {

    constructor() {
        super();
        super.id = 'readrawmangainfo';
        super.label = 'ReadRawManga (Info)';
        this.tags = [ 'webtoon', 'english' ];
        this.url = 'https://readrawmanga.info';
    }
}
*/