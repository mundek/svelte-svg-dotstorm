<script>
	// routes provided via svelte store
	import { routes } from './stores/route-store.js';
	// routed components must be in the ./routes folder
	import Router from 'svelte-spa-router';

	import { displaySettings } from './stores/activity-store.js';
	// console.log($displaySettings.width);
	export let appName;

</script>

<main>
	<h1>{appName}</h1>
	<div>
		<hr/>
		<Router routes={$routes} style="width: {$displaySettings.width}; height: auto"/>
		<hr/>
	</div>
</main>

<style>
	/* main {
		text-align: center;
		padding: 10px;
		max-width: none;
		margin: 0 auto;
	} */

	h1 {
		color: #008800;
		/* text-transform: uppercase; */
		font-size: 1.25em;
		font-weight: 700;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>