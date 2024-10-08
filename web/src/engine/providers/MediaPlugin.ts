import type { ISetting, ISettings, SettingsManager } from '../SettingsManager';
import type { StorageController } from '../StorageController';
import type { Tag } from '../Tags';
import type { Priority } from '../taskpool/TaskPool';
import icon from '../../img/media.webp';
import { NotImplementedError } from '../Error';
import { FetchWindowScript } from '../platform/FetchProvider';
import { Observable, ObservableArray, type IObservable } from '../Observable';

export type MediaChild = MediaContainer<MediaChild> | MediaItem;

export abstract class MediaItem {

    public constructor(public readonly Parent: MediaContainer<MediaItem>) {
    }

    public abstract Fetch(priority: Priority, signal: AbortSignal): Promise<Blob>;
}

export abstract class MediaContainer<T extends MediaChild> {

    protected readonly tags = new ObservableArray<Tag, this>([], this);
    protected readonly entries = new ObservableArray<T, this>([], this);
    private readonly updating = new Observable<boolean, this>(false, this);

    constructor(public readonly Identifier: string, public readonly Title: string, public readonly Parent?: MediaContainer<MediaContainer<T>>) {}

    public get Settings(): ISettings {
        throw new NotImplementedError();
    }

    public get URI(): URL {
        throw new NotImplementedError();
    }

    public get Icon(): string {
        return icon;
    }

    public get Tags(): IObservable<ReadonlyArray<Tag>, MediaContainer<T>> {
        return this.tags;
    }

    public get Entries(): IObservable<ReadonlyArray<T>, MediaContainer<T>> {
        return this.entries;
    }

    public get IsUpdating(): IObservable<boolean, MediaContainer<T>> {
        return this.updating;
    }

    public *[Symbol.iterator](): Iterator<T> {
        for (const entry of this.entries.Value) {
            yield entry;
        }
    }

    public IsSameAs(other: MediaContainer<T>): boolean {
        if(!this.Identifier || !other?.Identifier) {
            return false;
        }
        if(this.Identifier !== other.Identifier) {
            return false;
        }
        if(this.Parent && other.Parent) {
            return this.Parent.IsSameAs(other.Parent);
        }
        return true;
    }

    protected async Initialize(): Promise<void> {
        if (this.Parent) {
            await this.Parent.Initialize();
        }
        // NOTE: nonce method, disable after called once
        this.Initialize = () => Promise.resolve();
    }

    public CreateEntry(_identifier: string, _title: string): T {
        throw new NotImplementedError();
    }

    public TryGetEntry(_url: string): Promise<T> {
        throw new NotImplementedError();
    }

    protected abstract PerformUpdate(): Promise<T[]>;

    public async Update(): Promise<void> {
        if(this.updating.Value) {
            return;
        }

        try {
            await this.Initialize();
            this.entries.Value = await this.PerformUpdate();
        } finally {
            this.updating.Value = false;
        }
    }
}

export abstract class StoreableMediaContainer<T extends MediaItem> extends MediaContainer<T> {

    public abstract get IsStored(): IObservable<boolean, MediaContainer<T>>;
    public abstract Store(resources: Map<number, string>): Promise<void>;
}

export abstract class MediaScraper<T extends MediaContainer<MediaChild>> {

    public readonly URI: URL;
    public readonly Tags: Tag[];
    public readonly Settings: Record<string, ISetting> & Iterable<ISetting> = {
        *[Symbol.iterator](): Iterator<ISetting> {
            for(const setting of Object.values<ISetting>(this)) {
                yield setting;
            }
        }
    };

    public constructor(public readonly Identifier: string, public readonly Title: string, url: string, ...tags: Tag[]) {
        this.URI = new URL(url);
        this.Tags = tags;
    }

    public abstract CreatePlugin(storageController: StorageController, settingsManager: SettingsManager): T;

    public async Initialize(): Promise<void> {
        const request = new Request(this.URI.href);
        return FetchWindowScript(request, '');
    }

    public get Icon(): string {
        return icon;
    }
}