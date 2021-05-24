<script>
	import { replace } from 'svelte-spa-router';
	import Chart from '../components/LineChart.svelte';
	// activity-store data objects and function
	import { displaySettings, 
		currentDotSettings, 
		dotCount,
		currentMapSettings,
		chartData
        } from '../stores/activity-store.js';
	console.clear();
    // console.table($currentDotSettings);
	// console.table($currentMapSettings);
	console.table($currentMapSettings.survivalData);
	console.table($chartData);

    function startActivity() {
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
		<button on:click|preventDefault="{startActivity}">Select Another Activity</button>
	</form>
</body>

<style>

</style>