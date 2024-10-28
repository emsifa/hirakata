<script lang="ts">
	import { PUBLIC_GTAG_ID } from '$env/static/public';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	{#if PUBLIC_GTAG_ID}
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-{PUBLIC_GTAG_ID}"></script>
		<script data-gtag={PUBLIC_GTAG_ID}>
			const gtagId = document.currentScript.dataset.gtag;
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', gtagId);
		</script>
	{/if}
</svelte:head>

{@render children()}
