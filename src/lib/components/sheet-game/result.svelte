<script lang="ts">
	let {
		result,
		letters
	}: {
		result: SheetGameResult;
		letters: Letter[];
	} = $props();
</script>

<div class="rounded-xl bg-gray-600">
	<div class="flex justify-between border-b border-gray-700 p-3 text-lg text-gray-300">
		<span>Jumlah huruf</span>
		<span>
			{result.totalLetters ?? 1} dari {letters.length}
			({((result.totalLetters / letters.length) * 100).toFixed(0)}%)
		</span>
	</div>
	<div class="flex justify-between border-b border-gray-700 p-3 text-lg text-gray-300">
		<span>Waktu </span>
		<span>
			{result.totalTime.toFixed(2) ?? 2}s
		</span>
	</div>
	<div class="flex justify-between p-3 text-lg text-gray-300">
		<span>Runtutan terbanyak </span>
		<span>
			{result.highestStreak}x
		</span>
	</div>
</div>
