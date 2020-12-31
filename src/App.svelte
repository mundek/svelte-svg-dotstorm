<script>
	import Activity from './routes/Activity.svelte';
	export let appName;

	const displaySettings = {
		width: 700,
		height: 500,
		marginParams: {
			margins: 10,
			// bottomMargin: 50, // specific margin settings also available
			// leftMargin: 200 // wdMargins and htMargins (left/right and top/bottom, respectively)

		},
		backgroundImg: "https://picsum.photos/700/500"
	}

	const dotSettings = {
		dotColors: ["yellow", "burlywood", "cornflowerblue", "mediumseagreen"],
		dotRadius: 6,
		dotsPerColor: 5
	}
</script>

<main>
	<h1>App: {appName}!</h1>
	<Activity displayParams={displaySettings} dotParams={dotSettings}></Activity>
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>