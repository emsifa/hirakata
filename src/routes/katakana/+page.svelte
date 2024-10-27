<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Game from '$lib/components/game.svelte';
	import PageTitle from '$lib/components/page-title.svelte';
	import { katakanaLetters, katakanaSheets } from '$lib/katakana';

	let letters = katakanaLetters();
	let columns = katakanaSheets();
</script>

<svelte:head>
	<title>Katakana-kun</title>
	<meta
		name="description"
		content="Teman latihan menghafal huruf katakana secara runut, di saat kamu gabut. Gratis, tanpa iklan, tanpa batasan."
	/>
	<link rel="icon" href="/katakana.svg" sizes="any" type="image/svg+xml" />
</svelte:head>

<div
	class="lex min-h-screen w-full items-center justify-center bg-gray-800 p-4 text-gray-700 sm:p-8"
>
	<div class="mx-auto w-full max-w-4xl">
		<PageTitle
			title="Katakana-kun"
			description="Teman latihan menghafal huruf katakana secara runut, di saat kamu gabut."
		/>
		<Game {letters} {columns} />
		<div class="mt-3 hidden md:block">
			<Footer />
		</div>
	</div>
</div>
