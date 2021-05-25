import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		appName: 'BIO 104 :: Environmental Simulation'
	}
});

export default app;