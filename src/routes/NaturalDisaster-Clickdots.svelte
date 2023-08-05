<script>
	import { onMount } from 'svelte';
	// activity-store data objects and function
	import { displaySettings, 
		currentDotSettings, 
		dotCount,
		currentMapSettings,
		generateRandCoordinates,
		repositionDots
	} from '../stores/activity-store.js';

	// Scenario-specific settings and/or functions
	let backgroundImg = "./images/" + $currentMapSettings.mapFiles[$currentMapSettings.currentGeneration];
	// console.log($currentMapSettings.currentGeneration);
	let burningFires = generateRandCoordinates(
            $displaySettings.height
            , $displaySettings.width
            , { leftMargin: 5, rightMargin: 85, topMargin: 5, bottomMargin: 50 }
            , 10
            , ["flame.svg"]
        );
	// console.table(toxicClouds);
	onMount(() => {
		purgeDots();
	});
	
	// Router utility function
	import { replace } from 'svelte-spa-router';

	$currentDotSettings.startingCount = $currentDotSettings.randomCoordinates.length;
	console.log($currentDotSettings.startingCount);

	// set current generation's starting dot count
	var currGenDotCount = $currentDotSettings.randomCoordinates.length;
	// console.log(currGenDotCount);
	// In case of browser re-load, return to Start (home/default) route
	// TODO: In planned multi-map, multi-generational implementation, add store variables to maintain state (progress) through maps and/or generations
	if (!$currentDotSettings.dotRadius) {
		replace("/");
	}

		// end current generation in two cases:
		//	-- when percentage of remaining dots is equal/below minRemaining setting
		//  -- when there is only one color left in the current generation

		let percentRemaining = 0;
	$: {	
			percentRemaining = Math.round(
			$currentDotSettings.randomCoordinates.length 
			/ currGenDotCount 
			* 100);

			console.log($currentDotSettings.isSingleColor);
			// console.log($currentDotSettings.randomCoordinates)
			if (percentRemaining <= $currentMapSettings.minRemaining) {
				replace("/genResults");
			} else if ($currentDotSettings.isSingleColor) {
				replace("/genResults");
			}
		}
	
	function purgeDots() {
		let survivingDots = [];
		let overlapFlag = false;
		$currentDotSettings.randomCoordinates.forEach((aDot, aDotIndex) => {
			burningFires.forEach((aFire, index) => {
				// console.log(burningFires, index, aDot, aDotIndex);
				if(
					((aDot.x >= aFire.x && aDot.x <= (aFire.x + 75))
					&& (aDot.y >= aFire.y && (aDot.y <= (aFire.y + 75))))
				) { overlapFlag = true; }
			});
			if (!overlapFlag) { survivingDots = [...survivingDots, aDot]; }
			overlapFlag = false;
		});
		console.log(survivingDots);
		$currentDotSettings.randomCoordinates = [...survivingDots];
	}
	
	// click events on SVG dots call the removeDot function
	function removeDot(event) {
		// use SVG dot's current ID (set in the HTML {#each} loop) to remove it from the array of dots by updating/mutating component-internal 'randomCoordinates' array with the results of concatenating two slices of said array
		let theID = parseInt(event.target.id);
		// assign randomCoordinates the result of 'slicing' the mouse-click-targeted dot out of the array
		// assignment will trigger svelte reactivity
		let newRandomCoordinates = $currentDotSettings.randomCoordinates.slice(0,theID).concat($currentDotSettings.randomCoordinates.slice(theID+1,$currentDotSettings.randomCoordinates.length));
		$currentDotSettings.randomCoordinates = repositionDots(newRandomCoordinates);
		purgeDots();
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
	<svg 
		width="{$displaySettings.width}"
		height="{$displaySettings.height}"
		style="background-color:#D80000;z-index:1;">
		<image href="{backgroundImg}" height="{$displaySettings.height}" width="{$displaySettings.width}"/>
		{#each burningFires as coords, index}
			<image
				opacity="0" width="75"
				x="{coords.x}" y="{coords.y}" href="./images/{coords.color}">
				<animate 
					attributeType="CSS" attributeName="opacity" 
					begin="0s" from="0" to="1" dur="3s" 
					values="0.5; 0.75; 1; 0.75; 0.5"
					keyTimes="0; 0.2; 0.5; 0.8; 1"
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