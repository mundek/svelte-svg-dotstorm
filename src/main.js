import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		appName: 'BIO 104 :: An Environmental Simulation'
	}
});

export default app;