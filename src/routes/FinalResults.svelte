<script>
	import { replace } from 'svelte-spa-router';
	// activity-store data objects and function
	import { displaySettings, 
		currentDotSettings, 
		dotCount,
		currentMapSettings
        } from '../stores/activity-store.js';
    console.table($currentDotSettings);
    console.table($currentMapSettings);
</script>

<main>
    <h1>THE FINAL RESULTS</h1>
</main>