<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Game from '$lib/components/game.svelte';
	import PageTitle from '$lib/components/page-title.svelte';
	import { hiraganaLetters, hiraganaSheets } from '$lib/hiragana';

	let letters = hiraganaLetters();
	let columns = hiraganaSheets();
</script>

<svelte:head>
	<title>Hiragana-chan</title>
	<meta
		name="description"
		content="Teman latihan menghafal huruf hiragana secara runut, disaat kamu gabut. Gratis, tanpa iklan, tanpa batasan."
	/>
	<link rel="icon" href="/hiragana.svg" sizes="any" type="image/svg+xml" />
</svelte:head>

<div
	class="lex min-h-screen w-full items-center justify-center bg-gray-800 p-4 text-gray-700 sm:p-8"
>
	<div class="mx-auto w-full max-w-4xl">
		<PageTitle
			title="Hiragana-chan"
			description="Teman latihan menghafal huruf hiragana secara runut, disaat kamu gabut."
		/>
		<Game {letters} {columns} />
		<div class="mt-3 hidden md:block">
			<Footer />
		</div>
	</div>
</div>
