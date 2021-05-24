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
</script>

<body>
	<h1>THE FINAL RESULTS</h1>
	<div style="width: 500px; height: 300px"><Chart/></div>
</body>

<style>

</style>