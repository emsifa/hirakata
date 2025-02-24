<script lang="ts">
	import { createGame } from './logic.svelte';

	let svg: SVGElement | null = $state(null);
	let questionPath: SVGPathElement | null = $state(null);
	let playerPath: SVGPathElement | null = $state(null);

	let game = createGame();

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

<main>
	<svg bind:this={svg} width="300" height="300">
		<!-- Path Biru (Statis) -->
		<path
			bind:this={questionPath}
			d={game.questionPath ?? ''}
			class="stroke-gray-200"
			fill="none"
			stroke-width="12"
			stroke-linecap="round"
		/>

		<!-- Group for answered paths -->
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

		<!-- Path Merah (Interaktif) -->
		<path
			bind:this={playerPath}
			d={game.drawPathStr}
			class="stroke-secondary-500"
			fill="none"
			stroke-width="12"
			stroke-linecap="round"
		/>
	</svg>

	<ul>
		{#each game.similarities as sim}
			<li>{sim}%</li>
		{/each}
	</ul>

	<button onclick={game.start}>Start</button>
</main>

<style>
	svg {
		border: 1px solid black;
		cursor: crosshair;
		touch-action: none;
	}
</style>
