<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		column,
		isAsking,
		isBlinking,
		answered,
		question,
		speak
	}: {
		column: Column;
		isAsking: (romaji: string) => boolean;
		isBlinking: (romaji: string, correct?: boolean) => boolean;
		answered: string[];
		question: Question | null;
		speak: (letter: string) => void;
	} = $props();
</script>

<div class="flex flex-col items-center justify-center border border-gray-100 p-2">
	{#if column.type === 'blank'}
		&nbsp;
	{:else if column.type === 'header'}
		<h2 class="text-lg font-bold text-primary-500">{column.value}</h2>
	{:else if column.type === 'letter'}
		<h2 class="text-lg font-bold text-primary-500">{column.value}</h2>
	{:else if column.type === 'question'}
		<button
			class={cn('relative w-full rounded-lg p-2', {
				'text-gray-800': answered.includes(column.romaji ?? ''),
				'bg-primary-100 text-primary-600': isAsking(column.romaji) && !isBlinking(column.romaji),
				'bg-primary-300 text-primary-800': isAsking(column.romaji) && isBlinking(column.romaji),
				'bg-rose-100 text-rose-600': isBlinking(column.romaji, false),
				'cursor-default text-gray-400':
					question?.romaji !== column.romaji && !answered.includes(column.romaji ?? '')
			})}
			onclick={() => speak(column.letter ?? '')}
		>
			<span
				class={cn(`inline-flex transition-all`, {
					'scale-[1.5]': isAsking(column.romaji) || answered.includes(column.romaji ?? '')
				})}
			>
				{answered.includes(column.romaji ?? '') ? column.letter : column.romaji}
			</span>
			{#if answered.includes(column.romaji ?? '')}
				<span class="absolute right-0 top-0 rounded-full rounded-bl-lg p-1 text-xs text-black/30">
					{column.romaji}
				</span>
			{/if}
		</button>
	{/if}
</div>
