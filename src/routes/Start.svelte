
<script>
    import { replace } from 'svelte-spa-router';

    import { initialDotSettings, currentDotSettings, displaySettings, generateRandCoordinates } from '../stores/activity-store.js';

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
        replace("/baseline");
    }
</script>

<main>
    <form>
        <button on:click|preventDefault="{startActivity}">Start Activity</button>
    </form>
</main>