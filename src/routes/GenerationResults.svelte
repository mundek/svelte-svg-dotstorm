<script>
    import { replace } from 'svelte-spa-router';
	// activity-store data objects and function
    import {
        displaySettings, 
        currentDotSettings, 
        dotCount, 
        generateRandCoordinates, 
        currentMapSettings
    } from '../stores/activity-store.js';

    function continueActivity() {
        $currentMapSettings.survivalData[$currentMapSettings.currentGeneration] = $dotCount;
        if ($currentMapSettings.currentGeneration < $currentMapSettings.maxGeneration) {
            let newRandCoords = [];
            // console.log($dotCount);
            for (let item in $dotCount) {
                console.log(item, $dotCount[item]);
                newRandCoords = newRandCoords.concat(generateRandCoordinates(
                    $displaySettings.height,
                    $displaySettings.width,
                    $displaySettings.marginParams,
                    (parseInt($dotCount[item]) * 2),
                    [item]
                ));
            }
            $currentDotSettings.randomCoordinates = [...newRandCoords];
            console.table($currentDotSettings.randomCoordinates);
            $currentMapSettings.currentGeneration = $currentMapSettings.currentGeneration + 1;
            replace("/baseline");
        } else {
            replace("/finalResults");
        }
    }
</script>

<main>
    <h1>THE RESULTS</h1>
    <p>{#each $currentDotSettings.dotColors as aColor, index}#{index}&nbsp;<span style="color: {aColor}; font-weight: bold">{aColor.toUpperCase()}:&nbsp;</span>{$dotCount[aColor]}{#if (index < ($currentDotSettings.dotColors.length - 1))} &nbsp;<strong>|</strong> {/if}{/each}</p>
    <form>
        <button on:click|preventDefault="{continueActivity}">Next Generation</button>
    </form>
</main>