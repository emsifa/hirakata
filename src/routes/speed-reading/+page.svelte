<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import PageTitle from '$lib/components/page-title.svelte';
	import Simulation from '$lib/components/speed-reading/simulation.svelte';
	import { generateOptions, generateRandomWord } from '$lib/components/speed-reading/utils';
	import { cn } from '$lib/utils';
	import { sleep } from 'radash';
	import { onDestroy } from 'svelte';

	let countdown: number = $state(0);
	let countdownInterval: number | null = $state(null);

	let enableHiragana = $state(true);
	let enableKatakana = $state(false);

	let totalWords: number = $state(0);
	let totalLetters: number = $state(0);
	let totalWrongs: number = $state(0);
	let totalAttempts: number = $state(0);

	let question: Letter[] = $state([]);
	let options: Letter[] = $state([]);
	let answers: string[] = $state([]);
	let answerIndexes: number[] = $state([]); // to disable selected options

	let blink: {
		questionIndex: number;
		optionIndex: number;
		type: 'correct' | 'wrong';
	} | null = $state(null);
	let blinkTimeout: number | null = $state(null);

	let breakTime: number = $state(0);
	let breakInterval: number | null = $state(null);

	let activeQuestionIndex = $state(0);
	let playing = $derived(countdown > 0);
	let canBePlayed = $derived(!playing && (enableHiragana || enableKatakana));
	let hearts = $derived(5 - (totalWrongs % 5));

	let result: SpeedReadingGameResult | null = $state(null);

	function start() {
		reset();
		runCountdown(60);
		nextQuestion();
	}

	function runCountdown(n: number) {
		countdown = n;
		countdownInterval = setInterval(() => {
			countdown -= 1;
			if (countdown <= 0) {
				clearInterval(countdownInterval!);
				finish();
			}
		}, 1000);
	}

	function reset() {
		result = null;
		countdown = 0;
		totalWords = 0;
		totalLetters = 0;
		totalWrongs = 0;
		answers = [];
		answerIndexes = [];
		activeQuestionIndex = 0;
	}

	function nextQuestion() {
		question = generateRandomWord({
			hiragana: enableHiragana,
			katakana: enableKatakana
		});
		options = generateOptions(8, question, enableHiragana, enableKatakana);
		answers = [];
		answerIndexes = [];
		activeQuestionIndex = 0;
	}

	function answer(optionIndex: number) {
		const opt = options[optionIndex];
		if (!opt) return;

		totalAttempts += 1;

		const questionIndex = activeQuestionIndex;
		const rightAnswer = question[activeQuestionIndex].romaji;
		if (opt.romaji !== rightAnswer) {
			handleWrong(questionIndex, optionIndex);
		} else {
			handleCorrect(questionIndex, optionIndex);
		}
	}

	function handleWrong(questionIndex: number, optionIndex: number) {
		playSoundWrong();
		doBlink(questionIndex, optionIndex, 'wrong');

		totalWrongs += 1;

		if (totalWrongs % 5 === 0) {
			takeABreak();
		}
	}

	function handleCorrect(questionIndex: number, optionIndex: number) {
		playSoundCorrect();
		doBlink(questionIndex, optionIndex, 'correct');

		answers.push(question[questionIndex].romaji);
		answerIndexes.push(optionIndex);
		totalLetters += 1;

		if (activeQuestionIndex < question.length - 1) {
			activeQuestionIndex += 1;
		} else {
			activeQuestionIndex += 1;
			totalWords += 1;
			sleep(550).then(() => nextQuestion());
		}
	}

	function takeABreak() {
		breakTime = 5;
		breakInterval = setInterval(() => {
			breakTime -= 1;
			if (breakTime <= 0) {
				clearInterval(breakInterval!);
			}
		}, 1000);
	}

	function doBlink(questionIndex: number, optionIndex: number, type: 'correct' | 'wrong') {
		blink = {
			questionIndex,
			optionIndex,
			type
		};

		if (blinkTimeout) {
			clearTimeout(blinkTimeout);
		}

		blinkTimeout = setTimeout(() => {
			blink = null;
		}, 500);
	}

	function finish() {
		result = {
			totalAttempts,
			totalWords,
			totalLetters,
			totalWrongs
		};
	}

	onDestroy(() => {
		if (countdownInterval) {
			clearInterval(countdownInterval);
		}
	});

	function playSoundWrong() {
		const audio = new Audio('/sounds/wrong.mp3');
		audio.play();
	}

	function playSoundCorrect() {
		const audio = new Audio('/sounds/correct.mp3');
		audio.play();
	}
</script>

<svelte:head>
	<title>Speed Reading - Hirakata</title>
	<meta
		name="description"
		content="Latihan membaca cepat dalam waktu 1 menit. Bebas, tanpa iklan, tanpa batasan."
	/>
	<link rel="icon" href="/hiragana.svg" sizes="any" type="image/svg+xml" />
</svelte:head>

<div
	class="flex min-h-screen w-full items-center justify-center bg-gray-800 p-4 text-gray-700 sm:p-8"
>
	<div class="mx-auto w-full max-w-xl">
		<PageTitle title="Speed Reading" description="Latihan membaca cepat dalam waktu 1 menit." />
		<div class="relative grid w-full gap-4 rounded-xl bg-gray-700 p-4">
			{#if playing || result}
				<div class=" grid gap-4">
					{#if result}
						<div
							class="absolute left-0 top-0 z-20 flex h-full w-full select-none flex-col items-center justify-center rounded-xl bg-gray-700/75 p-2 text-sm text-white backdrop-blur-sm"
						>
							<div class="w-10/12 md:w-3/4">
								<div class="mb-3 text-4xl font-bold text-primary-500">Selesai!</div>
								<div class="w-full rounded-xl bg-gray-600">
									<div
										class="flex justify-between border-b border-gray-700 p-3 text-lg text-gray-300"
									>
										<span>Jumlah Kata</span>
										<span>
											{result.totalWords}
										</span>
									</div>
									<div
										class="flex justify-between border-b border-gray-700 p-3 text-lg text-gray-300"
									>
										<span>Jumlah Huruf</span>
										<span>
											{result.totalLetters}
										</span>
									</div>
									<div
										class="flex justify-between border-b border-gray-700 p-3 text-lg text-gray-300"
									>
										<span>Kesalahan</span>
										<span>
											{result.totalWrongs}x
										</span>
									</div>
									<div
										class="flex justify-between border-b border-gray-700 p-3 text-lg text-gray-300"
									>
										<span>Rate Berhasil</span>
										<span>
											{((result.totalLetters / result.totalAttempts) * 100).toFixed(2)}%
										</span>
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
						</div>
					{/if}
					{#if breakTime}
						<div
							class="absolute left-0 top-0 z-20 flex h-full w-full select-none flex-col items-center justify-center rounded-xl bg-gray-700/75 p-2 text-sm text-white backdrop-blur-sm"
						>
							<span class="text-5xl">{breakTime}s</span>
							<p>Take a breath</p>
						</div>
					{/if}
					<div class="flex justify-between text-gray-300">
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
						<div class="text-lg">{countdown}s</div>
					</div>
					<div class="flex min-h-[400px] w-full items-center justify-center">
						<div class="flex items-center gap-1">
							{#each question as letter, i (i)}
								<div
									class={cn(
										'relative flex flex-col items-center justify-center text-4xl font-medium text-gray-500 transition-all md:text-5xl',
										{
											'scale-125 text-gray-100': i === activeQuestionIndex,
											'text-primary-400': i < activeQuestionIndex,
											'text-rose-400': blink && blink.questionIndex === i && blink.type === 'wrong',
											'text-primary-500':
												blink && blink.questionIndex === i && blink.type === 'correct'
										}
									)}
								>
									<span>{letter.letter}</span>
									{#if answers[i]}
										<span class="absolute top-[100%] text-base text-gray-400">{answers[i]}</span>
									{/if}
								</div>
							{/each}
						</div>
					</div>
					<div class="grid grid-cols-4 gap-3 md:grid-cols-8">
						{#each options as { letter, romaji }, i}
							<button
								class={cn(
									'rounded-xl bg-gray-600 px-4 py-3 text-lg font-medium text-white transition-all hover:bg-gray-500 hover:text-white',
									{
										'cursor-not-allowed bg-primary-500 hover:bg-primary-500':
											answerIndexes.includes(i),
										'bg-rose-500 text-white hover:bg-rose-600':
											blink?.optionIndex === i && blink?.type === 'wrong',
										'bg-primary-500 text-white hover:bg-primary-600':
											blink?.optionIndex === i && blink?.type === 'correct'
									}
								)}
								disabled={answerIndexes.includes(i)}
								onclick={() => answer(i)}
							>
								{romaji}
							</button>
						{/each}
					</div>
				</div>
			{:else}
				<div class="flex min-h-[400px] w-full items-center justify-center">
					<Simulation hiragana={enableHiragana} katakana={enableKatakana} />
				</div>
				<div class="grid gap-3 rounded-lg">
					<div class="mt-4 grid w-full grid-cols-2 gap-2 rounded-xl bg-gray-600 p-2">
						<button
							class={cn(
								'rounded-lg bg-gray-600 px-2 py-1 font-semibold text-white transition-all hover:bg-gray-500 hover:text-white',
								{ 'bg-primary-500 text-white hover:bg-primary-600': enableHiragana }
							)}
							onclick={() => (enableHiragana = !enableHiragana)}
						>
							Hiragana
						</button>
						<button
							class={cn(
								'rounded-lg bg-gray-600 px-2 py-1 font-semibold text-white transition-all hover:bg-gray-500 hover:text-white',
								{ 'bg-primary-500 text-white hover:bg-primary-600': enableKatakana }
							)}
							onclick={() => (enableKatakana = !enableKatakana)}
						>
							Katakana
						</button>
					</div>
					<button
						class="w-full rounded-xl bg-primary-500 px-4 py-3 text-lg font-semibold text-white disabled:bg-gray-500 disabled:opacity-50"
						onclick={start}
						disabled={!canBePlayed}
					>
						START
					</button>
				</div>
			{/if}
		</div>
		<div class="mt-3">
			<Footer />
		</div>
	</div>
</div>
