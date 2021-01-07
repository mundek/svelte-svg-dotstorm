<script>
    import { replace } from 'svelte-spa-router';
	// activity-store data objects and function
    import {
        displaySettings, 
        currentDotSettings, 
        dotCount, 
        generateRandCoordinates 
    } from '../stores/activity-store.js';
    
    function nextGeneration() {
        let newRandCoords = [];
        // console.log($dotCount);
        for (let item in $dotCount) {
            console.log(item, $dotCount[item]);
            newRandCoords = [generateRandCoordinates(
		        $displaySettings.height
                , $displaySettings.width
                , $displaySettings.marginParams
                , (parseInt($dotCount[item]) * 5)
                , [item]
	        ), ...newRandCoords]
        }
        $currentDotSettings.randomCoordinates = [...newRandCoords];
        replace("/baseline");
    }
</script>

<main>startActivity
    <h1>THE RESULTS</h1>
    <p>{#each $currentDotSettings.dotColors as aColor, index}#{index}&nbsp;<span style="color: {aColor}; font-weight: bold">{aColor.toUpperCase()}:&nbsp;</span>{$dotCount[aColor]}{#if (index < ($currentDotSettings.dotColors.length - 1))} &nbsp;<strong>|</strong> {/if}{/each}</p>
    <form>
        <button on:click|preventDefault="{nextGeneration}">Next Generation</button>
    </form>
</main>