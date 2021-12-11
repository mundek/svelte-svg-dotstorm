<script>
	// activity-store data objects and function
	import { displaySettings, 
		currentDotSettings, 
		dotCount,
		currentMapSettings,
		repositionDots
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
			// console.log(leastColor, lowCount);
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
		// console.table($dotCount);
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
	function removeDot(event) {
		// scenario-specific check: do not remove dot if it is the pesticide resistant color
		if(event.target.attributes.fill.nodeValue != $currentMapSettings.resistantDotColor) {
			// use SVG dot's current ID (set in the HTML {#each} loop) to remove it from the array of dots by updating/mutating component-internal 'randomCoordinates' array with the results of concatenating two slices of said array
			let theID = parseInt(event.target.id);
			// assign randomCoordinates the result of 'slicing' the mouse-click-targeted dot out of the array
			// assignment will trigger svelte reactivity
			let newRandomCoordinates = $currentDotSettings.randomCoordinates.slice(0,theID).concat($currentDotSettings.randomCoordinates.slice(theID+1,$currentDotSettings.randomCoordinates.length));
			$currentDotSettings.randomCoordinates = repositionDots(newRandomCoordinates);
		}
	}

	function returnToMenu() {
		// resetAppState();
		$currentMapSettings = {
			...$currentMapSettings, 
			currentGeneration: 0
		};
		location.reload();
		// replace("/");
	}
</script>

<main>
	{#if $currentDotSettings.randomCoordinates.length > 0}
		{#if $displaySettings.debugging}
			<p>{#each $currentDotSettings.dotColors as aColor, index}#{index}&nbsp;<span style="color: {aColor}; font-weight: bold">{aColor.toUpperCase()}:&nbsp;</span>{$dotCount[aColor]}{#if (index < ($currentDotSettings.dotColors.length - 1))} &nbsp;<strong>|</strong> {/if}{/each}</p>
		{/if}
		<p style="color:darkblue;font-size:1em;">Total Dots Remaining: {$currentDotSettings.randomCoordinates.length} ({percentRemaining}%) | Target: {$currentMapSettings.minRemaining}% | Generation: {$currentMapSettings.currentGeneration}</p>
	{:else}
		<p>All gone!</p>
		<p>{#each $currentDotSettings.dotColors as aColor, index}#{index}&nbsp;<span style="color: {aColor}; font-weight: bold">{aColor.toUpperCase()}:&nbsp;</span>{$dotCount[aColor]}{#if (index < ($currentDotSettings.dotColors.length - 1))} &nbsp;<strong>|</strong> {/if}{/each}</p>
	{/if}
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
	<div><p>{$currentMapSettings.briefDescription}</p></div>
	<div class="more-info">
		<div class="tooltip">more information ...<span class="tooltiptext">{@html $currentMapSettings.longDescription}</span></div>
	</div>
</main>

<div class="menu-btn">
	<button on:click|preventDefault="{returnToMenu}">Return to Menu</button>
</div>

<style>
	main {
		text-align: center;
		padding: 10px;
		max-width: none;
		margin: 0 auto;
	}

	p {
		font-size: 1em;
	}

	.more-info {
		font-size: .33em;
		font-weight: bolder;
		color:darkslategray;
	}

	.menu-btn {
		text-align: left;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.tooltip {
		position: relative;
		display: inline-block;
		border-bottom: 1px dotted black;
	}

	.tooltip .tooltiptext {
		visibility: hidden;
		width: 500px;
		background-color: black;
		color: #fff;
		font-size: 2em;
		text-align: left;
		border-radius: 6px;
		padding: 5px 5px;
		position: absolute;
		z-index: 1;
		bottom: 150%;
		left: 0%;
		margin-left: -200px;
	}

	.tooltip .tooltiptext::after {
		content: "";
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: black transparent transparent transparent;
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
	}
</style>