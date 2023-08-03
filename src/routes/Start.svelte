<script>
    import { replace } from 'svelte-spa-router';
	import { mapObjects } from '../stores/mapObjects.js';

    let selectedMap;
    // console.clear();

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
        // NOTE: passed settings come from multiple activity-store elements
        if(selectedMap) {
            $currentMapSettings.mapName = selectedMap.mapName;
            $currentMapSettings.mapFiles = selectedMap.mapFiles;
            $currentMapSettings.mapRoute = selectedMap.mapRoute;
            if(!selectedMap.marginArray) {
                $currentMapSettings.margins = {
                    htMargins: $displaySettings.defaultHeightMargins,
                    wdMargins: $displaySettings.defaultWidthMargins
                }
            } else {
                $currentMapSettings.marginArray = selectedMap.marginArray;
                $currentMapSettings.margins = selectedMap.marginArray[1];
            }
            $currentMapSettings.maxGeneration = selectedMap.maxGenerations;
            $currentMapSettings.reproduce = selectedMap.reproduce;
            $currentMapSettings.briefDescription = selectedMap.briefDescription;
            $currentMapSettings.longDescription = selectedMap.longDescription;

            $currentDotSettings.randomCoordinates = generateRandCoordinates(
                $displaySettings.height,
                $displaySettings.width,
                $currentMapSettings.margins,
                $currentDotSettings.dotsPerColor,
                $currentDotSettings.dotColors
            );
            $currentDotSettings.startingCount = $currentDotSettings.randomCoordinates.length;
            $currentMapSettings.survivalData[$currentMapSettings.currentGeneration] = $dotCount;
            $currentMapSettings.currentGeneration = $currentMapSettings.currentGeneration + 1;
            replace("/" + $currentMapSettings.mapRoute);
        }
    }
</script>

<main>
    <form>
        <select bind:value={selectedMap}>
            {#if !($displaySettings.debugging)}
                {#each mapObjects as map}
                    {#if map.mapRoute === "baseline" || (($completedRoutes.baselineFlag) && (!$completedRoutes.routes.includes(map.mapRoute)))}
                        <option value={map}>{map.mapName}</option>
                    {:else if ($completedRoutes.routes.includes(map.mapRoute))}
                        <option value={map} disabled>{map.mapName}</option>
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
        <h3>Map Description - {selectedMap ? selectedMap.mapName : ''}</h3>
        {@html selectedMap ? selectedMap.longDescription : '[waiting...]'}
    </form>
</main>