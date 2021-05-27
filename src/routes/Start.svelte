<script>
    import { replace } from 'svelte-spa-router';
	import { mapObjects } from '../stores/mapObjects.js';
    let selectedMap;
    // console.clear();

    // route debugging flag
    let debugMaps = false;

    import { initialDotSettings, 
        currentDotSettings, 
        displaySettings, 
        generateRandCoordinates, 
        currentMapSettings, 
        dotCount,
        completedRoutes } from '../stores/activity-store.js';

    // console.log($completedRoutes);
    function startActivity() {
        $currentDotSettings = {...$initialDotSettings};
        // generate the initial array of random coordinates
        $currentDotSettings.randomCoordinates = generateRandCoordinates(
            $displaySettings.height,
            $displaySettings.width,
            $displaySettings.marginParams,
            $currentDotSettings.dotsPerColor,
            $currentDotSettings.dotColors
        );
        if(selectedMap) {
            $currentMapSettings.mapName = selectedMap.mapName;
            $currentMapSettings.mapFiles = selectedMap.mapFiles;
            $currentMapSettings.mapRoute = selectedMap.mapRoute;
            if($currentMapSettings.margins) {
                $currentMapSettings.margins = selectedMap.margins;
            }
            $currentMapSettings.survivalData[$currentMapSettings.currentGeneration] = $dotCount;
            $currentMapSettings.currentGeneration = $currentMapSettings.currentGeneration + 1;
            $currentMapSettings.maxGeneration = selectedMap.maxGenerations;
            $currentMapSettings.reproduce = selectedMap.reproduce;
            replace("/" + $currentMapSettings.mapRoute);
        }
    }
</script>

<main>
    <form>
        <select bind:value={selectedMap}>
            {#if !(debugMaps)}
                {#each mapObjects as map}
                    {#if ($completedRoutes.baselineFlag) && (!$completedRoutes.routes.includes(map.mapRoute))}
                        <option value={map}>{map.mapName}</option>
                    {:else if ($completedRoutes.routes.includes(map.mapRoute))}
                        <option value={map} disabled>{map.mapName}</option>
                    {:else if (map.mapRoute === "baseline")}
                        <option value={map}>{map.mapName}</option>
                    {:else}
                        <option value={map} disabled>{map.mapName}</option>
                    {/if}
                {/each}
            {:else}
                {#each mapObjects as map}
                    <option value={map}>{map.mapName}</option>
                {/each}
            {/if}
        </select>
        <button on:click|preventDefault="{startActivity}">Start Activity</button>
        <p>Map Description: {selectedMap ? selectedMap.briefDescription : '[waiting...]'}</p>
    </form>
</main>