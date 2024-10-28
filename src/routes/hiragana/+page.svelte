<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Game from '$lib/components/game.svelte';
	import PageTitle from '$lib/components/page-title.svelte';
	import { addFeature, Feature, hasFeature } from '$lib/features';
	import { hiraganaLetters, hiraganaSheets } from '$lib/hiragana';
	import { onMount } from 'svelte';

	let letters = hiraganaLetters();
	let columns = hiraganaSheets();
	let canRandomize = $state(true);

	onMount(() => {
		canRandomize = hasFeature(Feature.RANDOM_HIRAGANA);
	});

	function onFinished(result: Result) {
		if (
			(result.difficulty === 'medium' || result.difficulty === 'hard') &&
			result.highestCombo > 30 &&
			!hasFeature(Feature.RANDOM_HIRAGANA)
		) {
			addFeature(Feature.RANDOM_HIRAGANA);
			canRandomize = true;
			alert('Kamu telah membuka fitur baru! Sekarang kamu bisa mengacak huruf hiragana.');
		}
	}
</script>

<svelte:head>
	<title>Hiragana-chan</title>
	<meta
		name="description"
		content="Teman latihan menghafal huruf hiragana secara runut, di saat kamu gabut. Gratis, tanpa iklan, tanpa batasan."
	/>
	<link rel="icon" href="/hiragana.svg" sizes="any" type="image/svg+xml" />
</svelte:head>

<div
	class="lex min-h-screen w-full items-center justify-center bg-gray-800 p-4 text-gray-700 sm:p-8"
>
	<div class="mx-auto w-full max-w-4xl">
		<PageTitle
			title="Hiragana-chan"
			description="Teman latihan menghafal huruf hiragana secara runut, di saat kamu gabut."
		/>
		<Game {letters} {columns} {canRandomize} {onFinished} />
		<div class="mt-3 hidden md:block">
			<Footer />
		</div>
	</div>
</div>
