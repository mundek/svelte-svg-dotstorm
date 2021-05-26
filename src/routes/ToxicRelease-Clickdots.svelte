<script>
	console.clear();
	import { onMount } from 'svelte';
	// activity-store data objects and function
	import { displaySettings, 
		currentDotSettings, 
		dotCount,
		currentMapSettings,
		generateRandCoordinates
	} from '../stores/activity-store.js';
	console.clear();

	// Scenario-specific settings and/or functions
	let backgroundImg = "./images/" + $currentMapSettings.mapFiles[$currentMapSettings.currentGeneration];
	// console.log($currentMapSettings.currentGeneration);
	let toxicClouds = generateRandCoordinates(
            $displaySettings.height
            , $displaySettings.width
            , { leftMargin: 5, rightMargin: 85, topMargin: 5, bottomMargin: 50 }
            , 10
            , ["poison-cloud.svg"]
        );
	// console.table(toxicClouds);
	onMount(() => {
		console.log("MOUNTED!");
		let survivingDots = [];
		let overlapFlag = false;
		$currentDotSettings.randomCoordinates.forEach((aDot, aDotIndex) => {
			toxicClouds.forEach((aToxicCloud, index) => {
				// console.log(aToxicCloud, index, aDot, aDotIndex);
				if(
					((aDot.x >= aToxicCloud.x && aDot.x <= (aToxicCloud.x + 75))
					&& (aDot.y >= aToxicCloud.y && (aDot.y <= (aToxicCloud.y + 60))))
				) { overlapFlag = true; }
			});
			if (!overlapFlag) {  survivingDots = [...survivingDots, aDot]; }
			overlapFlag = false;
		});
		// console.log(survivingDots);
		$currentDotSettings.randomCoordinates = [...survivingDots];
	});


	// Router utility function
	import { replace } from 'svelte-spa-router';

	// set current generation's starting dot count
	var currGenDotCount = $currentDotSettings.randomCoordinates.length;
	// console.log(currGenDotCount);
	// In case of browser re-load, return to Start (home/default) route
	// TODO: In planned multi-map, multi-generational implementation, add store variables to maintain state (progress) through maps and/or generations
	if (!$currentDotSettings.dotRadius) {
		replace("/");
	}

	// Track rounded integer percentage of dots remaining out of the current generation's starting total
	$: percentRemaining = Math.round(
			$currentDotSettings.randomCoordinates.length 
			/ currGenDotCount 
			* 100
		);

	$: if (percentRemaining <= $currentMapSettings.minRemaining) {
		replace("/genResults");
	}
	// click events on SVG dots call the removeDot function
	function removeDot(event) {
		// use SVG dot's current ID (set in the HTML {#each} loop) to remove it from the array of dots by updating/mutating component-internal 'randomCoordinates' array with the results of concatenating two slices of said array
		let theID = parseInt(event.target.id);
		// assign randomCoordinates the result of 'slicing' the mouse-click-targeted dot out of the array
		// assignment will trigger svelte reactivity
		$currentDotSettings.randomCoordinates = 
			$currentDotSettings.randomCoordinates
			.slice(0,theID)
			.concat($currentDotSettings.randomCoordinates.slice(theID+1,$currentDotSettings.randomCoordinates.length));
	}

	// Return random integer in from/to range
	function rn(from, to) {
		return ~~(Math.random() * (to - from + 1)) + from;
	}

	// Return 
	function rs() {
		return arguments[rn(1, arguments.length) - 1];
	}

</script>

<main>
	<svg 
		width="{$displaySettings.width}"
		height="{$displaySettings.height}"
		style="background-color:#D80000;z-index:1;">
		<image href="{backgroundImg}" height="{$displaySettings.height}" width="{$displaySettings.width}"/>
		{#each toxicClouds as coords, index}
			<image
				opacity="0" width="75"
				x="{coords.x}" y="{coords.y}" href="./images/{coords.color}">
				<animate 
					attributeType="CSS" attributeName="opacity" 
					begin="0s" from="0" to="1" dur="5s" 
					values="0; 0.1; 1; 0.9; 0"
					keyTimes="0; 0.25; 0.5; 0.75; 1"
					repeatCount="indefinite" />
				<title>{index} | {coords.color} | {coords.x}, {coords.y}</title>
			</image>
		{/each}
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
		<p>Total Dots Remaining: {$currentDotSettings.randomCoordinates.length} ({percentRemaining}%) | Generation: {$currentMapSettings.currentGeneration}</p>
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