<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		column,
		answered,
		isActive,
		isCorrectBlinking,
		isWrongBlinking,
		hasAnswered,
		onClick
	}: {
		column: QuestionColumn;
		isActive: boolean;
		isCorrectBlinking: boolean;
		isWrongBlinking: boolean;
		hasAnswered: boolean;
		answered: string[];
		onClick: () => void;
	} = $props();

	let blinking = $derived(isCorrectBlinking || isWrongBlinking);
</script>

<button
	id={`question-${column.romaji}`}
	class={cn('relative w-full rounded-lg p-2', {
		'text-gray-800': answered.includes(column.romaji ?? ''),
		'bg-primary-100 text-primary-600': isActive && !blinking,
		'bg-primary-300 text-primary-800': isActive && blinking,
		'bg-rose-100 text-rose-600': isWrongBlinking,
		'cursor-default text-gray-400': !isActive && !hasAnswered
	})}
	onclick={onClick}
>
	<span
		class={cn(`inline-flex transition-all`, {
			'scale-[1.5]': isActive || hasAnswered
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
