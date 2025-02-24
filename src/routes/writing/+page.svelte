<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import PageTitle from '$lib/components/page-title.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import { playSoundCorrect, playSoundWrong } from '$lib/sound';
	import { cn } from '$lib/utils';
	import { createGame } from './logic.svelte';

	let svg: SVGElement | null = $state(null);
	let questionPath: SVGPathElement | null = $state(null);
	let playerPath: SVGPathElement | null = $state(null);

	let game = createGame({
		onQuestionDone() {
			playSoundCorrect();
		}
	});

	$effect(() => {
		if (!svg) return;

		function onDrawEnd() {
			game.stopDrawing();
			game.submitPath(questionPath!, playerPath!);
		}

		svg.addEventListener('mousedown', game.startDrawing);
		svg.addEventListener('mousemove', game.draw);
		svg.addEventListener('mouseup', onDrawEnd);
		svg.addEventListener('mouseleave', onDrawEnd);
		svg.addEventListener('touchstart', game.startDrawing);
		svg.addEventListener('touchmove', game.draw);
		svg.addEventListener('touchend', onDrawEnd);

		// Membersihkan event listener saat komponen di-unmount
		return () => {
			svg!.removeEventListener('mousedown', game.startDrawing);
			svg!.removeEventListener('mousemove', game.draw);
			svg!.removeEventListener('mouseup', onDrawEnd);
			svg!.removeEventListener('mouseleave', onDrawEnd);
			svg!.removeEventListener('touchstart', game.startDrawing);
			svg!.removeEventListener('touchmove', game.draw);
			svg!.removeEventListener('touchend', onDrawEnd);
		};
	});
</script>

<svelte:head>
	<title>Latihan Menulis Hiragana/Katakana</title>
	<meta
		name="description"
		content="Teman latihan menghafal huruf hiragana secara runut, di saat kamu gabut. Gratis, tanpa iklan, tanpa batasan."
	/>
	<link rel="icon" href="/hiragana.svg" sizes="any" type="image/svg+xml" />
</svelte:head>

<div
	class="lex min-h-screen w-full items-center justify-center bg-gray-800 p-4 text-gray-700 sm:p-8"
>
	<div class="mx-auto w-full max-w-2xl">
		<PageTitle
			title="Latiha Menulis Hiragana/Katakana"
			description="Teman latihan menghafal huruf hiragana secara runut, di saat kamu gabut."
		/>

		<main class="flex flex-wrap rounded-xl bg-gray-700 p-3 md:p-8">
			<div class="mr-6 flex flex-col items-center justify-center">
				{#if game.question}
					<p class="mb-3 text-lg font-semibold text-white">
						Tuliskan huruf "<span class="text-amber-500">{game.question.romaji}</span>"
					</p>
				{/if}
				<svg
					bind:this={svg}
					width="300"
					height="300"
					class="cursor-crosshair rounded-lg bg-gray-600 shadow-2xl"
				>
					<path
						bind:this={questionPath}
						d={game.questionPath ?? ''}
						class={cn('transition-all', {
							'stroke-transparent': !game.showHint,
							'stroke-gray-500': game.showHint
						})}
						fill="none"
						stroke-width="12"
						stroke-linecap="round"
					/>

					<g>
						{#each game.answeredPaths as answeredPath}
							<path
								d={answeredPath}
								class="fill-none stroke-primary-500"
								fill="none"
								stroke-width="12"
								stroke-linecap="round"
							/>
						{/each}
					</g>

					<path
						bind:this={playerPath}
						d={game.drawPathStr}
						class="stroke-gray-200"
						fill="none"
						stroke-width="12"
						stroke-linecap="round"
					/>
				</svg>
			</div>

			<div class="mt-8 flex flex-1 flex-col gap-4 md:mt-0">
				{#if !game.started}
					<Button className="w-full" onclick={game.start}>Start</Button>
				{:else}
					<Button className="w-full" onclick={() => game.blinkHint()}>Show Hint</Button>
				{/if}
			</div>
		</main>
		<div class="mt-3 hidden md:block">
			<Footer />
		</div>
	</div>
</div>
