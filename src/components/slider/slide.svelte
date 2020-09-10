<script>
import { fly } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';
export let active;
</script>

<style lang="text/postcss">
    .slide {
        opacity: 1;
        @apply absolute flex w-full h-full;
    }
</style>
{#if active}
<div 
    class="slide"
>
    <div class='m-auto flex flex-col lg:flex-row w-11/12 lg:w-8/12 p-4 rounded-md'>
        <div class="flex-1 flex" in:fly="{{x:-100, duration: 500, easing:cubicOut }}">
            <slot name="left"></slot>
        </div>
        <div class="lg:flex-1 flex" in:fly="{{x:100,delay:300, duration: 350, easing:cubicOut }}">
            <slot name="right"></slot>
        </div>
    </div>
</div>
{/if}