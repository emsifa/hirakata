<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Game from '$lib/components/game.svelte';
	import PageTitle from '$lib/components/page-title.svelte';
	import { hiraganaLetters, hiraganaSheets } from '$lib/hiragana';

	let letters = hiraganaLetters();
	let columns = hiraganaSheets();
</script>

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
