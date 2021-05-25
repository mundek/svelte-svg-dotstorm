<script>
	import { replace } from 'svelte-spa-router';
	import Chart from '../components/LineChart.svelte';
	// activity-store data objects and function
	import { currentMapSettings,
		completedRoutes
        } from '../stores/activity-store.js';
	console.clear();

    function restartActivity() {
		$completedRoutes.routes = [...$completedRoutes.routes, $currentMapSettings.mapRoute];
		$completedRoutes.baselineFlag = true;
		$currentMapSettings = {
			// copy these settings when user chooses scenario
			mapName: "",
			mapRoute: "",
			briefDescription: "",
			mapFiles: [],
			margins: [],
			// state settings for activity
			currentColors: [],
			currentDotCounts: [],
			survivalData: [],
			currentGeneration: 0,
			resistantDotColor: "",
			maxGeneration: 0,
			reproduce: true
		}
		replace("/");
	}
</script>

<body>
	<h1>THE FINAL RESULTS</h1>
	<div style="width: 500px; height: 300px"><Chart/></div>
	<form>
		<button on:click|preventDefault="{restartActivity}">Select Another Activity</button>
	</form>
</body>

<style>

</style>