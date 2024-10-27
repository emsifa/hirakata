<script lang="ts">
	import { cn } from '$lib/utils';
	import { clone, shuffle } from 'radash';
	import Footer from './footer.svelte';

	let {
		letters,
		columns
	}: {
		letters: Letter[];
		columns: Column[];
	} = $props();

	type Question = {
		letter: string;
		romaji: string;
		attempts: number;
		time: number;
	};

	type Result = {
		totalLetters: number;
		totalTime: number;
		letters: string[];
	};

	let shuffled: typeof letters = $state(clone(letters));
	let startedAt: Date | null = $state(null);
	let synth: SpeechSynthesis | null = $state(null);

	let questions: Question[] = $state([]);
	let questionIndex = $state(-1);
	let question = $derived(questions[questionIndex] ?? null);

	let attempts = $state(0);
	let questionStartedAt = $state(0);
	let blink: boolean | null = $state(null);
	let hearts = $state(5);
	let answered = $derived(questions.filter((q) => q.time > 0).map((q) => q.romaji));
	let result: Result | null = $state(null);

	function start() {
		shuffled = shuffle(letters);
		startedAt = new Date();
		questions = clone(letters).map((letter) => ({
			...letter,
			attempts: 0,
			time: 0
		}));
		questionIndex = 0;
		attempts = 0;
		synth = window.speechSynthesis;

		const q = questions[questionIndex];
		speak(q.letter);
	}

	function reset() {
		startedAt = null;
		questions = [];
		questionIndex = -1;
		attempts = 0;
		questionStartedAt = 0;
		blink = null;
		hearts = 5;
		result = null;
	}

	function next() {
		if (questionIndex + 1 < questions.length) {
			questionIndex++;
			attempts = 0;
			questionStartedAt = new Date().getTime();

			const q = questions[questionIndex];
			speak(q.letter);
		}
	}

	function isAsking(romaji?: string) {
		return startedAt && question?.romaji === romaji;
	}

	function answer(romaji: string) {
		if (!startedAt) return;

		const current = questions[questionIndex];
		const correct = current.romaji === romaji;
		current.attempts++;
		attempts++;

		if (correct) {
			current.time = new Date().getTime() - questionStartedAt;
			playSoundCorrect();
			return doBlink(true, () => next());
		}

		playSoundWrong();
		doBlink(false);
		hearts--;

		if (hearts === 0) {
			finish();
		}
	}

	function finish() {
		const totalLetters = answered.length;
		const totalTime = (new Date().getTime() - startedAt!.getTime()) / 1000;
		const resultLetters = letters.filter((l) => answered.includes(l.romaji)).map((l) => l.letter);

		result = { totalLetters, totalTime, letters: resultLetters };
	}

	function doBlink(type: boolean, callback?: () => void) {
		blink = type;
		setTimeout(() => {
			blink = null;
			callback?.();
		}, 500);
	}

	function isBlinking(romaji?: string, type?: boolean) {
		return typeof type === 'boolean'
			? blink === type && question?.romaji === romaji
			: blink && question?.romaji === romaji;
	}

	function speak(letter: string) {
		const utterance = new SpeechSynthesisUtterance(letter);
		utterance.lang = 'ja-JP';

		synth?.cancel();
		synth?.speak(utterance);
	}

	function playSoundWrong() {
		const audio = new Audio('/sounds/wrong.mp3');
		audio.play();
	}

	function playSoundCorrect() {
		const audio = new Audio('/sounds/correct.mp3');
		audio.play();
	}
</script>

<div
	class="select-none gap-4 rounded-xl bg-gray-700 p-3 shadow-xl shadow-gray-900/30 md:grid md:grid-cols-5 md:p-4"
>
	<div class="col-span-3 mb-[280px] md:mb-0">
		<div class="grid grid-cols-6 gap-0 overflow-hidden rounded-xl bg-white shadow-gray-300/30">
			{#each columns as column}
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
								'bg-primary-100 text-primary-600':
									isAsking(column.romaji) && !isBlinking(column.romaji),
								'bg-primary-300 text-primary-800':
									isAsking(column.romaji) && isBlinking(column.romaji),
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
								<span
									class="absolute right-0 top-0 rounded-full rounded-bl-lg p-1 text-xs text-black/30"
								>
									{column.romaji}
								</span>
							{/if}
						</button>
					{/if}
				</div>
			{/each}
		</div>
		<div class="mt-3 block md:hidden">
			<Footer />
		</div>
	</div>
	<div
		class="fixed bottom-0 left-0 z-20 col-span-2 w-full rounded-xl rounded-b-none border border-l-0 border-gray-700 bg-gray-700 p-4 md:relative md:flex md:flex-col md:rounded-l-none md:rounded-br-xl md:p-0"
	>
		{#if !result}
			<div>
				{#if startedAt}
					<div class="mb-4 flex items-center justify-between">
						<p class="text-lg text-gray-500">
							{questionIndex + 1} / {letters.length}
						</p>
						<div class="inline-flex gap-1">
							{#each { length: hearts } as _}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									class="h-5 w-5 fill-rose-400"
									><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
										d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
									/></svg
								>
							{/each}
						</div>
					</div>
				{/if}

				<div class="max-h-[180px] flex-1 overflow-auto md:max-h-none">
					<div class="grid grid-cols-5 gap-2">
						{#each shuffled.filter((b) => !answered.includes(b.romaji)) as letter}
							<button
								class={cn(
									'w-full rounded-lg bg-gray-600 p-2 text-center text-lg font-normal transition-all hover:bg-white hover:text-gray-800 hover:shadow-lg hover:shadow-gray-300/30',
									{
										'text-white': startedAt,
										'bg-primary-500 text-white': isBlinking(letter.romaji, true),
										'bg-rose-500 text-white': isBlinking(letter.romaji, false)
									}
								)}
								onclick={() => answer(letter.romaji)}
							>
								{letter.letter}
							</button>
						{/each}
					</div>
				</div>

				{#if !startedAt}
					<div class="mt-4">
						<button
							class="w-full rounded-xl bg-primary-500 px-4 py-3 text-lg font-semibold text-white"
							onclick={start}
						>
							START
						</button>
					</div>
				{/if}
			</div>
		{:else}
			<div class="">
				<h2 class="mb-4 text-3xl font-bold text-primary-500">Hasil</h2>
				<div class="flex flex-col">
					<div class="rounded-xl bg-gray-600">
						<div class="flex justify-between border-b border-gray-700 p-3 text-lg text-gray-300">
							<span>Jumlah huruf</span>
							<span>
								{result.totalLetters ?? 1} dari {letters.length}
								({((result.totalLetters / letters.length) * 100).toFixed(0)}%)
							</span>
						</div>
						<div class="flex justify-between p-3 text-lg text-gray-300">
							<span>Waktu </span>
							<span>
								{result.totalTime.toFixed(2) ?? 2}s
							</span>
						</div>
					</div>
				</div>
				<div class="mt-4">
					<button
						class="w-full rounded-xl bg-primary-500 px-4 py-3 text-lg font-semibold text-white"
						onclick={reset}
					>
						RESTART
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>
