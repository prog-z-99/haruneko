// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './MangaRoom.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('mangaroom', `MangaRoom`, 'http://manga-room.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class MangaRoom extends Connector {

    /**
     *
     *
    constructor() {
        super();
        super.id = 'mangaroom';
        super.label = 'MangaRoom';
        this.tags = [];
        this.url = 'http://manga-room.com';
    }

    _getMangaList( callback ) {
        callback( new Error( 'Please report this broken website on HakuNeko\'s GitHub project page.' ), undefined );
    }
    _getChapterList( manga, callback ) {
        callback( new Error( 'Please report this broken website on HakuNeko\'s GitHub project page.' ), undefined );
    }
    _getPageList( manga, chapter, callback ) {
        callback( new Error( 'Please report this broken website on HakuNeko\'s GitHub project page.' ), undefined );
    }
}
*/