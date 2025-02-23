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
			game.calculateSimilarity(50, questionPath!, playerPath!);
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
	<svg bind:this={svg} width="500" height="300">
		<!-- Path Biru (Statis) -->
		<path
			bind:this={questionPath}
			d="M16.2779 1.13131L71.7649 1.13131L2.00977 64.545L74.5392 52.2586C59.0821 53.5797 26.3448 69.3803 19.0522 87.1362C9.93648 109.331 29.7533 128.751 55.1188 123.995C65.7436 122.003 73.4823 115.804 74.5392 112.502"
			stroke="blue"
			fill="none"
			stroke-width="2"
			stroke-dasharray="5,5"
		/>

		<!-- Path Merah (Interaktif) -->
		<path
			bind:this={playerPath}
			d={game.playerPathData.length > 0
				? `M ${game.playerPathData.map((p) => p.join(' ')).join(' L ')}`
				: ''}
			stroke="red"
			fill="none"
			stroke-width="2"
			stroke-dasharray="5,5"
		/>
	</svg>

	<p>Kemiripan Path: {game.similarity}</p>
	<button onclick={game.clearPath}>Hapus Path Merah</button>
</main>

<style>
	svg {
		border: 1px solid black;
		cursor: crosshair;
		touch-action: none;
	}
</style>
