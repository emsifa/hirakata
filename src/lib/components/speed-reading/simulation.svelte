<script lang="ts">
	import { random, sleep } from 'radash';
	import { onMount } from 'svelte';
	import { generateRandomWord } from './utils';
	import { cn } from '$lib/utils';

	let {
		hiragana,
		katakana
	}: {
		hiragana?: boolean;
		katakana?: boolean;
	} = $props();

	let word: Letter[] = $state([]);
	let guesses: string[] = $state([]);
	let index = $state(-1);

	let answerResult: {
		correct: boolean;
		letters: {
			userAnswer: string;
			correctAnswer: string;
		}[];
	} | null = $state(null);

	onMount(() => {
		next();
	});

	function next() {
		answerResult = null;
		const notAll = !hiragana && !katakana;
		word = generateRandomWord({
			hiragana: notAll ? true : hiragana,
			katakana: notAll ? true : katakana
		});
		guesses = [];
		index = 0;
		simulateAnswer().then(() => next());
	}

	async function simulateAnswer() {
		for (let letter of word) {
			await sleep(random(100, 300));
			guesses.push(letter.romaji);
			index += 1;
		}

		await sleep(50);

		answerResult = {
			correct: true,
			letters: word.map((letter) => ({
				userAnswer: letter.romaji,
				correctAnswer: letter.romaji
			}))
		};

		await sleep(500);
	}
</script>

<div class="flex items-center gap-1">
	{#each word as letter, i (i)}
		<div
			class={cn(
				'relative flex flex-col items-center justify-center text-5xl font-medium text-gray-400 transition-all',
				{
					'scale-125 text-gray-100': i === index && !answerResult,
					'text-white': i < index && !answerResult,
					'text-primary-400':
						answerResult &&
						answerResult?.letters[i]?.userAnswer === answerResult?.letters[i]?.correctAnswer
				}
			)}
		>
			<span>{letter.letter}</span>
			{#if guesses[i]}
				<span
					class={cn('absolute top-[100%] text-base text-gray-400', {
						'text-primary-400':
							answerResult &&
							answerResult?.letters[i]?.userAnswer === answerResult?.letters[i]?.correctAnswer
					})}>{guesses[i]}</span
				>
			{/if}
		</div>
	{/each}
</div>
