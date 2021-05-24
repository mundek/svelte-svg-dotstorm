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

    // add current generation's dot count to the survival data
    $currentMapSettings.survivalData[$currentMapSettings.currentGeneration] = $dotCount;
    console.table($currentMapSettings.survivalData);
    console.log("reproduce: " + $currentMapSettings.reproduce);

    console.log($currentMapSettings.currentGeneration);
    // Continue to next generation (or final results)
    // TODO: Revise to display "next generation" and "final results" button and break continueActivity() into similarly-named functions
    function continueActivity() {
        console.log("curGen: " + $currentMapSettings.currentGeneration);
        console.log("maxGen: " + $currentMapSettings.maxGeneration);
        if ($currentMapSettings.currentGeneration < $currentMapSettings.maxGeneration) {
            $currentMapSettings.currentGeneration = $currentMapSettings.currentGeneration + 1;
            let newRandCoords = [];
            // console.log($dotCount);
            if($currentMapSettings.margins) {
                $displaySettings.marginParams 
                    = $currentMapSettings.margins[$currentMapSettings.currentGeneration];
            }
            if ($currentMapSettings.reproduce) {
                for (let item in $dotCount) {
                // console.log(item, $dotCount[item]);
                newRandCoords = newRandCoords.concat(generateRandCoordinates(
                    $displaySettings.height,
                    $displaySettings.width,
                    $displaySettings.marginParams,
                    (parseInt($dotCount[item]) * 2),
                    [item]
                ));
                }
                $currentDotSettings.randomCoordinates = [...newRandCoords];
            }
            // console.table($currentDotSettings.randomCoordinates);
            // console.table($currentMapSettings);
            replace("/" + $currentMapSettings.mapRoute);
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