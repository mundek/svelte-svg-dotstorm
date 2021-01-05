
<script>
    import { replace } from 'svelte-spa-router';

    import { initialDotSettings, currentDotSettings } from '../stores/activity-store.js';

    function startActivity() {
        // 
        $currentDotSettings = {...$initialDotSettings};
        // console.table($currentDotSettings);
        replace("/baseline");
    }
</script>

<main>
    <form>
        <button on:click|preventDefault="{startActivity}">Start Activity</button>
    </form>
</main>