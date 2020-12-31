<script>
	import { displaySettings, currentDotSettings} from '../stores/activity-store.js';

	// internal array to store original list of colors passed to component
	let startingColors = [];

	// generate the same number of random coordinates for each color in the array passed to "colors"
	function generateRandCoordinates(height, width, marginSettings, count, colors) {
		// set default currMargins object; updated below after parsing marginSettings
		let currMargins = { leftMargin: 0, rightMargin: 0, topMargin: 0, bottomMargin: 0 };

		// if no color object is included or if it is empty, default to one color: pink
		// if (colors.length < 1) colors = ["pink"];

		// ternary operators replace the following somewhat longer code to set currMargins based on granularity of the passed-in marginSettings object
		//
		// if (marginSettings.leftMargin) {
		// 	currMargins.leftMargin = marginSettings.leftMargins;
		// } else if (marginSettings.wdMargins) {
		// 	currMargins.leftMargin = marginSettings.wdMargins;
		// } else {
		// 	currMargins.leftMargin = marginSettings.margins;
		// }

		(marginSettings.leftMargin) ? currMargins.leftMargin = marginSettings.leftMargin
			: (marginSettings.wdMargins) ? currMargins.leftMargin = marginSettings.wdMargins
			: (marginSettings.margins) ? currMargins.leftMargin = marginSettings.margins : currMargins.leftMargin = 0;

		(marginSettings.rightMargin) ? currMargins.rightMargin = marginSettings.rightMargin
			: (marginSettings.wdMargins) ? currMargins.rightMargin = marginSettings.wdMargins
			: (marginSettings.margins) ? currMargins.rightMargin = marginSettings.margins : currMargins.leftMargin = 0;

		(marginSettings.topMargin) ? currMargins.topMargin = marginSettings.topMargin
			: (marginSettings.htMargins) ? currMargins.topMargin = marginSettings.htMargins
			: (marginSettings.margins) ? currMargins.topMargin = marginSettings.margins : currMargins.leftMargin = 0;

		(marginSettings.bottomMargin) ? currMargins.bottomMargin = marginSettings.bottomMargin
			: (marginSettings.htMargins) ? currMargins.bottomMargin = marginSettings.htMargins
			: (marginSettings.margins) ? currMargins.bottomMargin = marginSettings.margins : currMargins.leftMargin = 0;

		// copy (not reference) array passed into component-internal array to preserve original list for tracking purposes
		startingColors = [...colors];

		// generate the same number of random coordinates for each color passed in
		let newDots = [];
		for (var i=0; i<colors.length; i++) {
			for (var j=0; j<count; j++) {
				newDots.push({
					x: (Math.round((Math.random() * (width - (currMargins.leftMargin + currMargins.rightMargin)))) + (currMargins.leftMargin)), 
					y: (Math.round((Math.random() * (height - (currMargins.topMargin + currMargins.bottomMargin)))) + (currMargins.topMargin)),
					color: colors[i]
				});
			}
		}
		// console.table(coords);
		return newDots;
	}

	// click events on SVG dots call the removeDot function
	function removeDot(event) {
		// use SVG dot's current ID (set in the HTML {#each} loop) to remove it from the array of dots by updating/mutating component-internal 'randomCoordinates' array with the results of concatenating two slices of said array
		let theID = parseInt(event.target.id);
		// assign randomCoordinates the result of 'slicing' the mouse-click-targeted dot out of the array
		// assignment will trigger svelte reactivity
		randomCoordinates = randomCoordinates
								.slice(0,theID)
								.concat(randomCoordinates.slice(theID+1,randomCoordinates.length));
	}

	// component-internal array and associated reactive code to track current count of each dot color
	let colorCounts = [];
	// maintain current count of each dot color in colorCounts[]
	$: {
        // set colorCounts (of length N) to value 0 (https://stackoverflow.com/questions/4049847/initializing-an-array-with-a-single-value)
        let counter = startingColors.length;
        while (counter--) colorCounts[startingColors[counter]] = 0;

		// count total dots of each color
		for (let i=0; i<randomCoordinates.length; i++) {
			colorCounts[randomCoordinates[i].color]++;
		}
		console.table(colorCounts)
	}

	// generate the initial array of random coordinates
	// constants will be replaced by component parameters (or store values)
	let randomCoordinates = generateRandCoordinates(
		$displaySettings.height
		, $displaySettings.width
		, $displaySettings.marginParams
		, $currentDotSettings.dotsPerColor
		, $currentDotSettings.dotColors );
	//console.table(randomCoordinates);
</script>

<main>
	<svg width="{$displaySettings.width}" height="{$displaySettings.height}" style="background-color:#D80000">
		<image href="{$displaySettings.backgroundImg}" height="{$displaySettings.height}" width="{$displaySettings.width}"/>
		{#each randomCoordinates as coords, index}
			<circle
				cx="{coords.x}" cy="{coords.y}" r="{$currentDotSettings.dotRadius}"
				stroke="{coords.color}" stroke-width="1" fill="{coords.color}"
				on:click={removeDot} id={index}>
				<!-- debugging code -->	
				<!-- <title>{index} | {coords.color} | {coords.x}, {coords.y}</title> -->
			</circle>
			<!-- debugging code -->
			<!-- <text 
				x="{coords[0]}" y="{coords[1] - 1}" 
				stroke="green" stroke-width="1px" 
				text-anchor="middle" dominant-baseline="central" 
				pointer-events="none">
					{index}
			</text> -->
		{/each}
	</svg>
	{#if randomCoordinates.length > 0}
		<p>{#each startingColors as aColor, index}&nbsp;&nbsp;#{index} <span style="color: {aColor}; font-weight: bold">{aColor.toUpperCase()}:</span>&nbsp;{colorCounts[aColor]}&nbsp;&nbsp;{#if (index < (startingColors.length - 1))}|{/if}{/each}</p>
		<p>Total Dots Remaining: {randomCoordinates.length}</p>
	{:else}
		<p>All gone!</p>
		<p>{$currentDotSettings.dotColors}</p>
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