<script>
	export let appName;
	const MARGIN = 10;
	const HT_WD = 480;

	function generateRandCoord(height, width) {
		let x = (Math.random() * width) + MARGIN;
		let y = (Math.random() * height) + MARGIN;
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
		console.log(event.target.id, randomCoordinates[event.target.id]);
	}

	let randomCoordinates = generateRandCoordinates(HT_WD, HT_WD, 10);
	console.table(randomCoordinates);
</script>

<main>
	<h1>App: {appName}!</h1>
	<svg width="500" height="500">
		{#each randomCoordinates as coords, index}
			<circle
				cx="{coords[0]}" cy="{coords[1]}" r="{MARGIN}" stroke="green" stroke-width="4" fill="yellow"
				on:click={report} id={index}
			/>
		{/each}
	</svg>
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