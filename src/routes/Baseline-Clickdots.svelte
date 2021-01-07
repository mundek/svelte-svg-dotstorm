<script>
	// Scenario-specific settings and/or functions
	let backgroundImg = "./images/MAP-autumn.forest.jpg";
	// Router utility function
	import { replace } from 'svelte-spa-router';
	// activity-store data objects and function
	import { displaySettings, 
		currentDotSettings, 
		dotCount, 
		generateRandCoordinates
		} from '../stores/activity-store.js';

	// In case of browser re-load, return to Start (home/default) route
	// TODO: In planned multi-map, multi-generational implementation, add store variables to maintain state (progress) through maps and/or generations
	if (!$currentDotSettings.dotRadius) {
		replace("/");
	}

	// Track percentage of dots remaining out of the starting total
	$: percentRemaining = Math.round(
			$currentDotSettings.randomCoordinates.length 
			/ ($currentDotSettings.dotsPerColor * $currentDotSettings.dotColors.length) 
			* 100
		);

	$: if (percentRemaining <= 20) {
		replace("/genResults");
	}
	// click events on SVG dots call the removeDot function
	function removeDot(event) {
		// use SVG dot's current ID (set in the HTML {#each} loop) to remove it from the array of dots by updating/mutating component-internal 'randomCoordinates' array with the results of concatenating two slices of said array
		let theID = parseInt(event.target.id);
		// assign randomCoordinates the result of 'slicing' the mouse-click-targeted dot out of the array
		// assignment will trigger svelte reactivity
		$currentDotSettings.randomCoordinates = $currentDotSettings.randomCoordinates
								.slice(0,theID)
								.concat($currentDotSettings.randomCoordinates.slice(theID+1,$currentDotSettings.randomCoordinates.length));
	}

	// generate the initial array of random coordinates
	$currentDotSettings.randomCoordinates = generateRandCoordinates(
		$displaySettings.height
		, $displaySettings.width
		, $displaySettings.marginParams
		, $currentDotSettings.dotsPerColor
		, $currentDotSettings.dotColors
	);
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
		<p>Total Dots Remaining: {$currentDotSettings.randomCoordinates.length} ({percentRemaining}%)</p>
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