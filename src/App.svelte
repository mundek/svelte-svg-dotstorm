<script>
	// routes provided via svelte store
	import { routes } from './stores/route-store.js';
	// routed components must be in the ./routes folder
	import Router from 'svelte-spa-router';

	import { displaySettings } from './stores/activity-store.js';
	// console.log($displaySettings.width);
	export let appName;

</script>

<main style="width: {$displaySettings.width}; height: auto">
	<h1>App: {appName}!</h1>
	<div>
		<hr/>
		<Router routes={$routes}/>
		<hr/>
	</div>
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