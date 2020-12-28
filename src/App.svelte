<script>
	export let appName;
	const MARGIN = 10;
	const HEIGHT = 600;
	const WIDTH = 800;
	const DOT_RADIUS = 10;

	function generateRandCoord(height, width) {
		let x = (Math.random() * width) - (2 * MARGIN);
		let y = (Math.random() * height) - (2 * MARGIN);
		return [x, y];
	}
	function generateRandCoordinates(height, width, count) {
		let coords = [];
		for (var i=0; i<count; i++) {
			// coords.push(generateRandCoord(height,width));
			coords.push([ 
				Math.ceil((Math.random() * width) + MARGIN), 
				Math.ceil((Math.random() * height) + MARGIN)
			]);
		}
		return coords;
	}
	function report(event) {
		let theID = parseInt(event.target.id);
		console.log(event.target.id, randomCoordinates[event.target.id]);
		randomCoordinates = randomCoordinates.slice(0,theID).concat(randomCoordinates.slice(theID+1,randomCoordinates.length))
		console.log(randomCoordinates);
	}

	let randomCoordinates = generateRandCoordinates(
		HEIGHT - (2 * MARGIN)
		, WIDTH - (2 * MARGIN)
		, 6
		);
	console.table(randomCoordinates);
</script>

<main>
	<h1>App: {appName}!</h1>
	<svg width="{WIDTH}" height="{HEIGHT}" style="background-color:#D80000">
		{#each randomCoordinates as coords, index}
			<circle
				cx="{coords[0]}" cy="{coords[1]}" r="{DOT_RADIUS}"
				stroke="yellow" stroke-width="1" fill="yellow"
				on:click={report} id={index}
			/>
		{/each}
	</svg>
	{#if randomCoordinates.length > 0}
	<p>Keep clicking!</p>
	{:else}
	<p>All gone!</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
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