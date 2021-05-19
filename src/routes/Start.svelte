
<script>
    import { replace } from 'svelte-spa-router';
	import { mapObjects } from '../stores/mapObjects.js';
    // console.table(mapObjects);
    let selectedMap;

    import { initialDotSettings, currentDotSettings, displaySettings, generateRandCoordinates, currentMapSettings } from '../stores/activity-store.js';

    function startActivity() {
        $currentDotSettings = {...$initialDotSettings};
        // generate the initial array of random coordinates
        $currentDotSettings.randomCoordinates = generateRandCoordinates(
            $displaySettings.height
            , $displaySettings.width
            , $displaySettings.marginParams
            , $currentDotSettings.dotsPerColor
            , $currentDotSettings.dotColors
        );
        // console.table($currentDotSettings);
        // console.table(selectedMap.mapFiles);
        if(selectedMap) {
            $currentMapSettings.mapFiles = selectedMap.mapFiles;
            replace("/" + selectedMap.mapRoute);
        }
    }
</script>

<main>
    <form>
        <select bind:value={selectedMap}>
            {#each mapObjects as map}
                <option value={map}> {map.mapName} </option>
            {/each}
        </select>
        <button on:click|preventDefault="{startActivity}">Start Activity</button>
        <p>Map Description: {selectedMap ? selectedMap.briefDescription : '[waiting...]'}</p>
    </form>
</main>