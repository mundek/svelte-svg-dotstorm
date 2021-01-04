<script>
	// Scenario-specific settings and/or functions
	let backgroundImg = "./images/MAP-autumn.forest.jpg";
	import { replace } from 'svelte-spa-router';

	import { displaySettings, currentDotSettings, currentMapSettings, generateRandCoordinates } from '../stores/activity-store.js';

	// In case of browser re-load, return to Start (home/default) route
	// TODO: In planned multi-map, multi-generational implementation, add store variables to maintain state (progress) through maps and/or generations
	if (!$currentDotSettings.dotRadius) {
		replace("/");
	}

	// generate the same number of random coordinates for each color in the array passed to "colors"
	// function generateRandCoordinates(height, width, marginSettings, count, colors) {
	// 	// set default currMargins object; updated below after parsing marginSettings
	// 	let currMargins = { leftMargin: 0, rightMargin: 0, topMargin: 0, bottomMargin: 0 };

	// 	// if no color object is included or if it is empty, default to one color: pink
	// 	// if (colors.length < 1) colors = ["pink"];

	// 	// ternary operators replace the following somewhat longer code to set currMargins based on granularity of the passed-in marginSettings object
	// 	//
	// 	// if (marginSettings.leftMargin) {
	// 	// 	currMargins.leftMargin = marginSettings.leftMargins;
	// 	// } else if (marginSettings.wdMargins) {
	// 	// 	currMargins.leftMargin = marginSettings.wdMargins;
	// 	// } else {
	// 	// 	currMargins.leftMargin = marginSettings.margins;
	// 	// }

	// 	(marginSettings.leftMargin) ? currMargins.leftMargin = marginSettings.leftMargin
	// 		: (marginSettings.wdMargins) ? currMargins.leftMargin = marginSettings.wdMargins
	// 		: (marginSettings.margins) ? currMargins.leftMargin = marginSettings.margins : currMargins.leftMargin = 0;

	// 	(marginSettings.rightMargin) ? currMargins.rightMargin = marginSettings.rightMargin
	// 		: (marginSettings.wdMargins) ? currMargins.rightMargin = marginSettings.wdMargins
	// 		: (marginSettings.margins) ? currMargins.rightMargin = marginSettings.margins : currMargins.rightMargin = 0;

	// 	(marginSettings.topMargin) ? currMargins.topMargin = marginSettings.topMargin
	// 		: (marginSettings.htMargins) ? currMargins.topMargin = marginSettings.htMargins
	// 		: (marginSettings.margins) ? currMargins.topMargin = marginSettings.margins : currMargins.topMargin = 0;

	// 	(marginSettings.bottomMargin) ? currMargins.bottomMargin = marginSettings.bottomMargin
	// 		: (marginSettings.htMargins) ? currMargins.bottomMargin = marginSettings.htMargins
	// 		: (marginSettings.margins) ? currMargins.bottomMargin = marginSettings.margins : currMargins.bottomMargin = 0;

	// 	// generate the same number of dots for each color passed in, giving each dot random coordinates
	// 	// NOTE: No checking for full or partial overlap
	// 	let newDots = [];
	// 	for (var i=0; i<colors.length; i++) {
	// 		for (var j=0; j<count; j++) {
	// 			newDots.push({
	// 				x: (Math.round((Math.random() * (width - (currMargins.leftMargin + currMargins.rightMargin)))) + (currMargins.leftMargin)), 
	// 				y: (Math.round((Math.random() * (height - (currMargins.topMargin + currMargins.bottomMargin)))) + (currMargins.topMargin)),
	// 				color: colors[i]
	// 			});
	// 		}
	// 	}
	// 	console.table(newDots);
	// 	return newDots;
	// }

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

	// component-internal array and associated reactive code to track current count of each dot color
	let colorCounts = [];
	// maintain current count of each dot color in colorCounts[]
	$: {
        // set colorCounts (of length N) to value 0 (https://stackoverflow.com/questions/4049847/initializing-an-array-with-a-single-value)
        let counter = $currentDotSettings.dotColors.length;
        while (counter--) colorCounts[$currentDotSettings.dotColors[counter]] = 0;

		// count total dots of each color
		for (let i=0; i<$currentDotSettings.randomCoordinates.length; i++) {
			colorCounts[$currentDotSettings.randomCoordinates[i].color]++;
		}
		// console.table(colorCounts);
	}

	// generate the initial array of random coordinates
	// constants will be replaced by component parameters (or store values)
	$currentDotSettings.randomCoordinates = generateRandCoordinates(
		$displaySettings.height
		, $displaySettings.width
		, $displaySettings.marginParams
		, $currentDotSettings.dotsPerColor
		, $currentDotSettings.dotColors );
	console.table($currentDotSettings.randomCoordinates);
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
				<!-- <title>{index} | {coords.color} | {coords.x}, {coords.y}</title> -->
			</circle>
			<!-- debugging code -->
			<text 
				x="{coords.x}" y="{coords.y - 1}" 
				stroke="green" stroke-width="1px" 
				text-anchor="middle" dominant-baseline="central" 
				pointer-events="none">
					{index}
			</text>
		{/each}
	</svg>
	{#if $currentDotSettings.randomCoordinates.length > 0}
		<p>{#each $currentDotSettings.dotColors as aColor, index}#{index}&nbsp;<span style="color: {aColor}; font-weight: bold">{aColor.toUpperCase()}:&nbsp;</span>{colorCounts[aColor]}{#if (index < ($currentDotSettings.dotColors.length - 1))} &nbsp;<strong>|</strong> {/if}{/each}</p>
		<p>Total Dots Remaining: {$currentDotSettings.randomCoordinates.length}</p>
	{:else}
		<p>All gone!</p>
		<p>{#each $currentDotSettings.dotColors as aColor, index}#{index}&nbsp;<span style="color: {aColor}; font-weight: bold">{aColor.toUpperCase()}:&nbsp;</span>{colorCounts[aColor]}{#if (index < ($currentDotSettings.dotColors.length - 1))} &nbsp;<strong>|</strong> {/if}{/each}</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 10px;
		max-width: none;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		/* text-transform: uppercase; */
		font-size: 1em;
		font-weight: 400;
	}

	p {
		font-size: 1em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>