<script>
	import { tick } from 'svelte';
	// activity-store data objects and function
	import { displaySettings, 
		currentDotSettings, 
		dotCount,
		currentMapSettings
	} from '../stores/activity-store.js';
	// console.clear();

	// Scenario-specific settings and/or functions
	let backgroundImg = "./images/" + $currentMapSettings.mapFiles[$currentMapSettings.currentGeneration];
	// Router utility function
	import { replace } from 'svelte-spa-router';

	// initialize flag for setting pesticide resistance for last two generations
	let leastColor = "abcdefg123";
	if($currentMapSettings.currentGeneration == 4) {
		// console.table($currentMapSettings.survivalData[2]);
		let lowCount = 9999999; // arbitrarily high, and unlikely, value
		$currentDotSettings.dotColors.forEach((item) => {
			// console.table($currentMapSettings.survivalData[2][item]);
			if(($currentMapSettings.survivalData[3][item] < lowCount) && ($currentMapSettings.survivalData[3][item] > 0)) {
				lowCount = $currentMapSettings.survivalData[3][item];
				leastColor = item;
			}
			console.log(leastColor, lowCount);
		});
		$currentMapSettings.resistantDotColor = leastColor;
	}

	$dotCount.forEach(item => console.log(item));

	// set current generation's starting dot count
	let currGenDotCount = $currentDotSettings.randomCoordinates.length;

	// In case of browser re-load, return to Start (home/default) route
	if (!$currentDotSettings.dotRadius) {
		replace("/");
	}

	// Track rounded integer percentage of dots remaining out of the current generation's starting total
	$: percentRemaining = Math.round(
			$currentDotSettings.randomCoordinates.length 
			/ currGenDotCount 
			* 100
		);

	$: if ((percentRemaining <= $currentMapSettings.minRemaining)) {
		replace("/genResults");
	}

	let remainingColors = Object.values($dotCount).length;
	$: if (remainingColors < 2) {
		replace("/genResults");
	}

	function updateRemainingColors() {
		let tempDotCount = 0;
		console.table($dotCount);
		const dotCounts = Object.values($dotCount);
		// console.log(dotCounts);
		dotCounts.forEach((count) => {
			if (count > 0) {
				tempDotCount++;
			}
		});
		remainingColors = tempDotCount;
	}

	// click events on SVG dots call the removeDot function
	async function removeDot(event) {
		// use SVG dot's current ID (set in the HTML {#each} loop) to remove it from the array of dots by updating/mutating component-internal 'randomCoordinates' array with the results of concatenating two slices of said array
		if(event.target.attributes.fill.nodeValue != $currentMapSettings.resistantDotColor) {
			let theID = parseInt(event.target.id);
			// assign randomCoordinates the result of 'slicing' the mouse-click-targeted dot out of the array
			// assignment will trigger svelte reactivity
			$currentDotSettings.randomCoordinates = 
				$currentDotSettings.randomCoordinates
				.slice(0,theID)
				.concat($currentDotSettings.randomCoordinates.slice(theID+1,$currentDotSettings.randomCoordinates.length));
			await tick();
		}
		updateRemainingColors();
		console.log(remainingColors);
	}
</script>

<main>
	<svg width="{$displaySettings.width}" height="{$displaySettings.height}" style="background-color:#D80000">
		<image href="{backgroundImg}" height="{$displaySettings.height}" width="{$displaySettings.width}"/>
		{#each $currentDotSettings.randomCoordinates as coords, index}
			<circle
				cx="{coords.x}" cy="{coords.y}" r="{$currentDotSettings.dotRadius}"
				stroke="{coords.color}" stroke-width="1" fill="{coords.color}"
				on:click={removeDot} id={index}>
				<!-- debugging code -->	
				<title>{index} | {coords.color} | {coords.x}, {coords.y}</title>
			</circle>
		{/each}
	</svg>
	{#if $currentDotSettings.randomCoordinates.length > 0}
		<p>{#each $currentDotSettings.dotColors as aColor, index}#{index}&nbsp;<span style="color: {aColor}; font-weight: bold">{aColor.toUpperCase()}:&nbsp;</span>{$dotCount[aColor]}{#if (index < ($currentDotSettings.dotColors.length - 1))} &nbsp;<strong>|</strong> {/if}{/each}</p>
		<p>Total Dots Remaining: {$currentDotSettings.randomCoordinates.length} ({percentRemaining}%) | Target: {$currentMapSettings.minRemaining} | Generation: {$currentMapSettings.currentGeneration}</p>
	{:else}
		<p>All gone!</p>
		<p>{#each $currentDotSettings.dotColors as aColor, index}#{index}&nbsp;<span style="color: {aColor}; font-weight: bold">{aColor.toUpperCase()}:&nbsp;</span>{$dotCount[aColor]}{#if (index < ($currentDotSettings.dotColors.length - 1))} &nbsp;<strong>|</strong> {/if}{/each}</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 10px;
		max-width: none;
		margin: 0 auto;
	}

	p {
		font-size: .5em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>