<script lang="ts">
    import { fade } from 'svelte/transition';
    import {
        Button,
        ClickableTile,
        ContextMenu,
        ContextMenuDivider,
        ContextMenuOption,
    } from 'carbon-components-svelte';
    import {
        Star,
        StarFilled,
        PlayFilled,
        WarningAltInverted,
    } from 'carbon-icons-svelte';
    import { selectedMedia } from '../stores/Stores';
    import { coinflip } from '../lib/transitions';

    import type {
        MediaContainer,
        MediaChild,
    } from '../../../engine/providers/MediaPlugin';
    import { Bookmark } from '../../../engine/providers/Bookmark';
    import { onDestroy, onMount } from 'svelte';
    import type { MediaContainer2 } from '../Types';

    export let style = '';

    export let media: MediaContainer2;
    let selected: boolean = false;
    $: selected = $selectedMedia?.IsSameAs(media);

    //Bookmarks
    $: isBookmarked = media
        ? HakuNeko.BookmarkPlugin.IsBookmarked(media)
        : false;
    async function toggleBookmark() {
        isBookmarked = await window.HakuNeko.BookmarkPlugin.Toggle(media);
    }
    $: isOrphaned =
        isBookmarked && (media as Bookmark).IsOrphaned ? true : false;

    //Context menu
    let mediadiv: HTMLElement;

    //Unviewed content
    let unFlaggedItems: MediaContainer<MediaChild>[] = [];
    let delayedContentCheck;


    async function findMediaUnFlaggedContent(updatedmedia:MediaContainer<MediaChild>) {
        if (updatedmedia.IsSameAs(media)) { 
            unFlaggedItems = (await HakuNeko.ItemflagManager.GetUnFlaggedItems(
                media,
            )) as MediaContainer<MediaChild>[];
        } 
    }

    onMount(() => {
        const delay = $selectedMedia?.IsSameAs(HakuNeko.BookmarkPlugin) ? 0 : 1500;
        delayedContentCheck = setTimeout(
        () => {
            findMediaUnFlaggedContent(media);
            HakuNeko.ItemflagManager.ContainerFlagsEventChannel.Subscribe(findMediaUnFlaggedContent);
        },delay);
    });

    onDestroy(() => {
        clearTimeout(delayedContentCheck);
        HakuNeko.ItemflagManager.ContainerFlagsEventChannel.Unsubscribe(findMediaUnFlaggedContent);
    });
    
</script>

<ContextMenu target={[mediadiv]}>
    <ContextMenuOption indented labelText="Browse Chapters" shortcutText="⌘B" />
    <ContextMenuOption
        indented
        labelText={isBookmarked ? 'Remove from Bookmarks' : 'Add to Bookmarks'}
        shortcutText="⌘F"
        onclick={toggleBookmark}
    />
    <ContextMenuDivider />
    <ContextMenuOption indented labelText="Trackers">
        <!--{#each window.HakuNeko.PluginController.InfoTrackers as tracker}
            <ContextMenuOption labelText="{tracker.Title}" onclick={() => {selectedTracker=tracker; isTrackerModalOpen=true;}} />
        {/each}
            -->
    </ContextMenuOption>
    <ContextMenuDivider />
</ContextMenu>

<div bind:this={mediadiv} class="media" {style} in:fade class:selected>
    {#if isOrphaned}
        <span in:coinflip={{ duration: 200 }}>
            <Button
                class="orphaned"
                size="small"
                kind="ghost"
                icon={WarningAltInverted}
                tooltipPosition="right"
                tooltipAlignment="end"
                iconDescription="Plugin missing : remove"
                onclick={toggleBookmark}
            />
        </span>
    {:else if isBookmarked}
        <span in:coinflip={{ duration: 200 }}>
            <Button
                class="bookmarked"
                size="small"
                kind="ghost"
                icon={StarFilled}
                tooltipPosition="right"
                tooltipAlignment="end"
                iconDescription="Remove from bookmarks"
                onclick={toggleBookmark}
            />
        </span>
    {:else}
        <span in:coinflip={{ duration: 200 }}>
            <Button
                size="small"
                kind="ghost"
                icon={Star}
                tooltipPosition="right"
                tooltipAlignment="end"
                iconDescription="Add to bookmarks"
                onclick={toggleBookmark}
            />
        </span>
    {/if}
    <button 
        class="website"
        onclick={() => {
            window.open(media.Parent.URI.href, '_blank');
        }}
        title="Open {media.Parent.URI.href}"
        aria-label="Open {media.Parent.URI.href}"
    >
        <img
            class="pluginIcon"
            src={media.Parent.Icon}
            alt="Media Plugin Icon"
        />
    </button>
    <ClickableTile
        class="title"
        onclick={(e) => {
            e.preventDefault();
            $selectedMedia = media;
        }}
    >
        <span title={media.Title}>{media.Title}</span>
    </ClickableTile>
    {#if unFlaggedItems.length > 0}
        <Button
            icon={PlayFilled}
            kind="ghost"
            size="small"
            onclick={(e) => {
                e.preventDefault();
                $selectedMedia = media;
            }}
        />
    {/if}
</div>

<style>
    .media {
        display: flex;
        user-select: none;
    }
    .media:hover {
        background-color: var(--cds-hover-row);
        --cds-ui-01: var(--cds-hover-row);
    }
    .media.selected {
        background-color: var(--cds-selected-ui);
        --cds-ui-01: var(--cds-selected-ui);
    }
    .media :global(.title) {
        flex: auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-height: unset;
        display: flex;
        align-items: center;
        padding: 0;
    }
    .media button.website {
        position:relative;
        top:0.2em;
        padding:0;
        border: none;
        background: none;
        background-color: unset;
        margin-right: 0.4em;
    }
    .media .pluginIcon {
        width: 1.4em;
        height: 1.4em;
        border-radius:20%;
    }
    .media :global(button) {
        min-height: unset;
    }

    .media :global(button.bookmarked) {
        --cds-icon-01: var(--cds-support-03);
    }
    .media :global(button.orphaned) {
        --cds-icon-01: var(--cds-button-danger-secondary);
    }
    .media :global(button:hover) {
        --cds-icon-01: var(--cds-hover-secondary);
    }
</style>
