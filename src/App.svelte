<script>
	export let appName;
	const MARGIN = 10;
	const HEIGHT = 600;
	const WIDTH = 800;
	const DOT_RADIUS = 10;
	const TOTAL_DOTS = 12;

	function generateRandCoordinates(height, width, count) {
		let coords = [];
		for (var i=0; i<count; i++) {
			coords.push([ 
				Math.round((Math.random() * (width - (2 * MARGIN)))) + MARGIN, 
				Math.round((Math.random() * (height - (2 * MARGIN)))) + MARGIN
			]);
		}
		return coords;
	}
	function removeDot(event) {
		let theID = parseInt(event.target.id);
		// assign randomCoordinates the result of 'slicing' the mouse-click-targeted dot out of the array
		randomCoordinates = randomCoordinates
								.slice(0,theID)
								.concat(randomCoordinates.slice(theID+1,randomCoordinates.length))
		console.table(randomCoordinates);
	}

	let randomCoordinates = generateRandCoordinates(
		HEIGHT - (2 * MARGIN)
		, WIDTH - (2 * MARGIN)
		, TOTAL_DOTS );
	//console.table(randomCoordinates);
</script>

<main>
	<h1>App: {appName}!</h1>
	<svg width="{WIDTH}" height="{HEIGHT}" style="background-color:#D80000">
		{#each randomCoordinates as coords, index}
			<circle
				cx="{coords[0]}" cy="{coords[1]}" r="{DOT_RADIUS}"
				stroke="yellow" stroke-width="1" fill="yellow"
				on:click={removeDot} id={index}
			/>
			<text 
				x="{coords[0]}" y="{coords[1] - 1}" 
				stroke="green" stroke-width="1px" 
				text-anchor="middle" dominant-baseline="central" 
				pointer-events="none">
					{index}
			</text>
		{/each}
	</svg>
	{#if randomCoordinates.length > 0}
		<p>Keep clicking: {randomCoordinates.length} more to go!</p>
	{:else}
		<p>All gone!</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: none;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		/* text-transform: uppercase; */
		font-size: 2em;
		font-weight: 400;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>