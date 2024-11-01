<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		label,
		value,
		started,
		blinkCorrect,
		blinkWrong,
		onClick
	}: {
		label: string;
		value: string;
		started: boolean;
		blinkCorrect: boolean;
		blinkWrong: boolean;
		onClick: (romaji: string) => void;
	} = $props();
</script>

<button
	class={cn(
		'w-full rounded-lg bg-gray-600 p-2 text-center text-lg font-normal transition-all hover:bg-white hover:text-gray-800 hover:shadow-lg hover:shadow-gray-300/30',
		{
			'text-white': started,
			'bg-primary-500 text-white': blinkCorrect,
			'bg-rose-500 text-white': blinkWrong
		}
	)}
	onclick={() => onClick(value)}
>
	{label}
</button>
