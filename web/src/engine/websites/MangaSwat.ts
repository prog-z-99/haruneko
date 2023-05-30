import { Tags } from '../Tags';
import icon from './MangaSwat.webp';
import { DecoratableMangaScraper } from '../providers/MangaPlugin';
import * as MangaStream from './decorators/WordPressMangaStream';
import * as Common from './decorators/Common';

const pageScripts = `
    new Promise((resolve, reject) => {
        let t = new RocketLazyLoadScripts;
        t._loadEverythingNow();
        setTimeout(() => {
            resolve(ts_reader_control.getImages());
        }, 2500);
    });
`;

@MangaStream.MangaCSS(/^https?:\/\/swatmanga\.net\/manga\/[^/]+\/$/)
@MangaStream.MangasSinglePageCSS('div#content div.soralist ul li a.series', '/manga/list-mode/')
@MangaStream.ChaptersSinglePageCSS('div.bxcl ul li span.lchx a')
@MangaStream.PagesSinglePageJS([], pageScripts)
@Common.ImageAjax()
export default class extends DecoratableMangaScraper {

    public constructor() {
        super('mangaswat', 'SWAT Manga', 'https://swatmanga.net', Tags.Media.Manhwa, Tags.Media.Manhua, Tags.Language.Arabic);
    }

    public override get Icon() {
        return icon;
    }
}