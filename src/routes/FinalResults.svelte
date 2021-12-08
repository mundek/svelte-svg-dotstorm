<script>
	import { replace } from 'svelte-spa-router';
	import Chart from '../components/LineChart.svelte';
	// activity-store data objects and function
	import { currentMapSettings,
		completedRoutes,
		chartData
        } from '../stores/activity-store.js';
	// console.clear();
	// console.table($chartData);
	let finalData = [...$chartData];

    function restartActivity() {
		$completedRoutes.routes = [...$completedRoutes.routes, $currentMapSettings.mapRoute];
		$completedRoutes.baselineFlag = true;
		$currentMapSettings = {
			mapName: "",
			mapRoute: "",
			briefDescription: "",
			mapFiles: [],
			// state settings for activity
			currentColors: [],
			currentDotCounts: [],
			survivalData: [],
			minRemaining: 20,
			currentGeneration: 0,
			resistantDotColor: "",
			reproduce: true,
			genMultiplier: 5
		}
		replace("/");
	}
</script>

<body>
	<h1>THE FINAL RESULTS</h1>
	<h2>{$currentMapSettings.mapName}</h2>
	<div style="width: 600px; height: 375px"><Chart/></div>
	<hr/>
	<table>
		<thead>
			<tr>
				<th>&nbsp;</th>
				<th>Color</th>
				{#each finalData[0].points as aPoint}
					<th>Gen. {aPoint.x}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each finalData as aDataset}
				<tr>
					<td bgcolor="{aDataset.color}">&nbsp;</td>
					<td>{aDataset.color}</td>
					{#each aDataset.points as aPoint}
						<td>{aPoint.y}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	{#if $currentMapSettings.resistantDotColor}
		<h3>Resistant dot color: {$currentMapSettings.resistantDotColor}</h3>
	{/if}
	<hr/>
	<form>
		<button on:click|preventDefault="{restartActivity}">Select Another Activity</button>
	</form>
</body>

<style>
	button {
		background-color: #4CAF50; /* Green */
		border: 1px solid black;
		color: white;
		padding: 8px 12px;
		text-align: center;
		text-decoration: none;
		font-weight: bolder;
		display: inline-block;
		font-size: 20px;
	}
</style>