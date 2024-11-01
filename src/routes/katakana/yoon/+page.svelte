<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Game from '$lib/components/game/game.svelte';
	import Menubar from '$lib/components/menubar.svelte';
	import PageTitle from '$lib/components/page-title.svelte';
	import { addFeature, Feature, hasFeature } from '$lib/features';
	import { katakanaYoonLetters, katakanaYoonSheet } from '$lib/katakana/yoon';
	import { onMount } from 'svelte';

	let letters = katakanaYoonLetters();
	let columns = katakanaYoonSheet();
	let canRandomize = $state(true);
	let dakuonEnabled = $state(false);
	let yoonEnabled = $state(false);

	onMount(() => {
		canRandomize = hasFeature(Feature.RANDOM_KATAKANA);
		dakuonEnabled = hasFeature(Feature.KATAKANA_DAKUON);
		yoonEnabled = hasFeature(Feature.KATAKANA_YOON);
	});

	function onStarted(difficulty: Difficulty, mode: GameplayMode) {
		if (window.gtag) {
			window.gtag('event', 'game_started', {
				game: 'katakana',
				difficulty,
				mode
			});
		}
	}

	function onReset(inGame: boolean, difficulty: Difficulty, mode: GameplayMode) {
		if (inGame && window.gtag) {
			window.gtag('event', 'game_reset', {
				game: 'katakana',
				difficulty,
				mode
			});
		}
	}

	function onFinished(result: Result) {
		if (window.gtag) {
			window.gtag('event', 'game_finished', {
				game: 'katakana',
				difficulty: result.gameplay.difficulty,
				mode: result.gameplay.mode,
				result
			});
		}
	}
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
		<Menubar
			links={[
				{ label: 'Seion', href: '/katakana', locked: false, active: false },
				{ label: 'Dakuon', href: '/katakana/dakuon', locked: !dakuonEnabled, active: false },
				{ label: 'Yōon', href: '/katakana/yoon', locked: !yoonEnabled, active: true }
			]}
		/>
		<Game
			grid={3}
			locked={!yoonEnabled}
			{letters}
			{columns}
			{canRandomize}
			{onStarted}
			{onReset}
			{onFinished}
		/>
		<div class="mt-3 hidden md:block">
			<Footer />
		</div>
	</div>
</div>
