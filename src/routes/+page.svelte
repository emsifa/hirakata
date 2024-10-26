<script lang="ts">
	import { hiragana } from '$lib/letters';
	import { cn } from '$lib/utils';
	import { clone, shuffle } from 'radash';

	let letters = hiragana();

	let columns = [
		{ type: 'blank' },
		{ type: 'header', value: 'A' },
		{ type: 'header', value: 'I' },
		{ type: 'header', value: 'U' },
		{ type: 'header', value: 'E' },
		{ type: 'header', value: 'O' },

		{ type: 'blank' },
		{ type: 'question', value: 'a' },
		{ type: 'question', value: 'i' },
		{ type: 'question', value: 'u' },
		{ type: 'question', value: 'e' },
		{ type: 'question', value: 'o' },

		{ type: 'letter', value: 'KA' },
		{ type: 'question', value: 'ka' },
		{ type: 'question', value: 'ki' },
		{ type: 'question', value: 'ku' },
		{ type: 'question', value: 'ke' },
		{ type: 'question', value: 'ko' },

		{ type: 'letter', value: 'SA' },
		{ type: 'question', value: 'sa' },
		{ type: 'question', value: 'shi' },
		{ type: 'question', value: 'su' },
		{ type: 'question', value: 'se' },
		{ type: 'question', value: 'so' },

		{ type: 'letter', value: 'TA' },
		{ type: 'question', value: 'ta' },
		{ type: 'question', value: 'chi' },
		{ type: 'question', value: 'tsu' },
		{ type: 'question', value: 'te' },
		{ type: 'question', value: 'to' },

		{ type: 'letter', value: 'NA' },
		{ type: 'question', value: 'na' },
		{ type: 'question', value: 'ni' },
		{ type: 'question', value: 'nu' },
		{ type: 'question', value: 'ne' },
		{ type: 'question', value: 'no' },

		{ type: 'letter', value: 'HA' },
		{ type: 'question', value: 'ha' },
		{ type: 'question', value: 'hi' },
		{ type: 'question', value: 'fu' },
		{ type: 'question', value: 'he' },
		{ type: 'question', value: 'ho' },

		{ type: 'letter', value: 'MA' },
		{ type: 'question', value: 'ma' },
		{ type: 'question', value: 'mi' },
		{ type: 'question', value: 'mu' },
		{ type: 'question', value: 'me' },
		{ type: 'question', value: 'mo' },

		{ type: 'letter', value: 'YA' },
		{ type: 'question', value: 'ya' },
		{ type: 'blank' },
		{ type: 'question', value: 'yu' },
		{ type: 'blank' },
		{ type: 'question', value: 'yo' },

		{ type: 'letter', value: 'RA' },
		{ type: 'question', value: 'ra' },
		{ type: 'question', value: 'ri' },
		{ type: 'question', value: 'ru' },
		{ type: 'question', value: 're' },
		{ type: 'question', value: 'ro' },

		{ type: 'letter', value: 'WA' },
		{ type: 'question', value: 'wa' },
		{ type: 'blank' },
		{ type: 'blank' },
		{ type: 'blank' },
		{ type: 'question', value: 'wo' },

		{ type: 'letter', value: 'N' },
		{ type: 'question', value: 'n' },
		{ type: 'blank' },
		{ type: 'blank' },
		{ type: 'blank' },
		{ type: 'blank' }
	];

	let shuffled: typeof letters = $state(shuffle(letters));
	let startedAt: Date | null = $state(null);
	let questionIndex = $state(0);

	let question = $derived({ ...letters[questionIndex] });

	const start = () => {
		shuffled = shuffle(letters);
		startedAt = new Date();
		questionIndex = 0;
	};

	const next = () => {
		questionIndex++;
	};
</script>

<div
	class="lex bg-primary-600 min-h-screen w-full items-center justify-center p-4 text-gray-700 sm:p-8"
>
	<div class="mx-auto w-full max-w-4xl">
		<div class="mb-6 text-white">
			<h1 class="text-4xl font-bold">Hiragana</h1>
			<p class="text-lg opacity-75">Latihan hafalan hiragana secara runut.</p>
		</div>
		<div class="grid grid-cols-5">
			<div
				class="col-span-3 grid grid-cols-6 gap-0 overflow-hidden rounded-l-xl border border-r-0 border-gray-100 bg-white shadow-2xl shadow-gray-300/30"
			>
				{#each columns as column}
					<div class="flex flex-col items-center justify-center border border-gray-100 p-2">
						{#if column.type === 'blank'}
							&nbsp;
						{:else if column.type === 'header'}
							<h2 class="text-lg font-bold">{column.value}</h2>
						{:else if column.type === 'letter'}
							<h2 class="text-lg font-bold">{column.value}</h2>
						{:else if column.type === 'question'}
							<button
								class={cn('w-full rounded-lg p-2', {
									'bg-primary-100 text-primary-600': question.romaji === column.value,
									'text-gray-400': question.romaji !== column.value
								})}
							>
								<span
									class={`inline-flex transition-all ${question.romaji === column.value ? 'scale-[1.5]' : ''}`}
								>
									{column.value}
								</span>
							</button>
						{/if}
					</div>
				{/each}
			</div>
			<div class="col-span-2 rounded-r-xl border border-l-0 border-gray-200 bg-gray-100 p-4">
				<p class="mb-4 text-lg text-gray-500">
					Click correct letter for romaji <span
						class="text-primary-500 inline-flex rounded-full p-1 text-xl font-medium underline"
						>{question.romaji}</span
					>
				</p>
				<div class="grid grid-cols-5 gap-2">
					{#each shuffled as letter}
						<button
							class="w-full rounded-lg bg-gray-200 p-2 text-center text-lg font-normal transition-all hover:bg-white hover:shadow-lg hover:shadow-gray-300/30"
						>
							{letter.letter}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<div class="mt-4">
			<button
				class="bg-primary-500 w-full rounded-xl px-4 py-3 text-lg font-semibold text-white"
				onclick={start}
			>
				START
			</button>
		</div>
	</div>
</div>
