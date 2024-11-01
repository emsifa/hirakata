<script lang="ts">
	import { cn } from '$lib/utils';
	import JSConfetti from 'js-confetti';
	import { onMount } from 'svelte';
	import Footer from '../footer.svelte';
	import Infobar from './infobar.svelte';
	import LockedMessage from './locked-message.svelte';
	import { createGame } from './logic.svelte';
	import Option from './option.svelte';
	import Question from './question.svelte';
	import Result from './result.svelte';

	let {
		letters,
		columns,
		canRandomize,
		onFinished,
		onStarted,
		onReset,
		locked,
		grid = 6
	}: {
		grid?: number;
		locked?: boolean;
		letters: Letter[];
		columns: Column[];
		canRandomize: boolean;
		onStarted?: (difficulty: Difficulty, mode: GameplayMode) => void;
		onReset?: (inGame: boolean, difficulty: Difficulty, mode: GameplayMode) => void;
		onFinished?: (result: Result) => void;
	} = $props();

	let confettiCanvas: HTMLCanvasElement | null = null;
	let confetti: JSConfetti | null = $state(null);
	let synth: SpeechSynthesis | null = $state(null);

	const game = createGame({
		letters,
		locked: !!locked,
		onStarted({ difficulty, mode }) {
			onStarted?.(difficulty, mode);
		},
		onNext({ letter }) {
			speak(letter);
		},
		onCorrect() {
			playSoundCorrect();
		},
		onWrong() {
			playSoundWrong();
		},
		onReset() {
			confetti?.clearCanvas();
		},
		onFinished(result: Result) {
			const allCorrects = letters.length === result.totalLetters;
			if (allCorrects) {
				confetti?.addConfetti({
					emojis: ['🌸', '✨', '🌟', '🗼'],
					emojiSize: 20,
					confettiNumber: 90,
					confettiRadius: 6
				});
			}

			onFinished?.(result);
		}
	});

	onMount(() => {
		confetti = new JSConfetti({ canvas: confettiCanvas! });
		synth = window.speechSynthesis;
	});

	function confirmReset() {
		if (confirm('Apakah kamu yakin ingin mengakhiri permainan?')) {
			game.reset();
			onReset?.(game.startedAt !== null, game.difficulty, game.mode);
		}
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
	class="relative select-none gap-4 rounded-xl bg-gray-700 p-3 shadow-xl shadow-gray-900/30 md:grid md:grid-cols-5 md:p-4"
>
	<div class="col-span-3 mb-[280px] md:mb-0">
		<div
			class={cn('grid gap-0 overflow-hidden rounded-xl bg-white shadow-gray-300/30', {
				'grid-cols-6': grid === 6,
				'grid-cols-3': grid === 3
			})}
		>
			{#each columns as column, i (`column-${column.type}-${i}}`)}
				<div class="flex flex-col items-center justify-center border border-gray-100 p-2">
					{#if column.type === 'header'}
						<h2 class="text-lg font-bold text-primary-500">{column.value}</h2>
					{:else if column.type === 'letter'}
						<h2 class="text-lg font-bold text-primary-500">{column.value}</h2>
					{:else if column.type === 'question'}
						<Question
							{column}
							answered={game.answered}
							isActive={game.question?.romaji === column.romaji}
							isCorrectBlinking={game.blink?.romaji === column.romaji && game.blink?.type === true}
							isWrongBlinking={game.blink?.romaji === column.romaji && game.blink?.type === false}
							hasAnswered={game.answered.includes(column.romaji)}
							onClick={() => speak(column.letter)}
						/>
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
		{#if !game.result}
			<div
				class={cn('md:min-h-none relative flex h-full flex-col py-4 md:py-0', {
					'min-h-[200px]': !canRandomize,
					'min-h-[240px]': canRandomize
				})}
			>
				{#if game.startedAt}
					<Infobar
						hearts={game.hearts}
						currentStreak={game.currentStreak}
						questionNumber={game.questionIndex + 1}
						totalQuestions={game.questions.length}
					/>
				{/if}

				<div class="max-h-[180px] flex-1 overflow-auto md:max-h-none">
					<div class="grid grid-cols-5 gap-2">
						{#each game.options as opt (opt.letter)}
							<Option
								label={opt.letter}
								value={opt.romaji}
								started={!!game.startedAt}
								blinkCorrect={game.blink?.romaji === opt.romaji && game.blink?.type === true}
								blinkWrong={game.blink?.romaji === opt.romaji && game.blink?.type === false}
								onClick={() => game.answer(opt.romaji)}
							/>
						{/each}
					</div>
				</div>

				{#if game.startedAt}
					<div class="mt-4 w-full">
						<button
							class="w-full rounded-xl bg-primary-500 px-4 py-3 text-lg font-semibold text-white"
							onclick={confirmReset}
						>
							RESET
						</button>
					</div>
				{/if}
				{#if !game.startedAt}
					<div
						class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-gray-700/80 md:px-8"
					>
						<h2 class="text-3xl font-bold text-primary-500">Pilih tingkat kesulitan</h2>
						<div class="mt-4 grid w-full grid-cols-3 gap-3">
							{#each game.difficultyOptions as opt (opt.value)}
								<button
									class={cn(
										'w-full rounded-xl bg-gray-600 px-3 py-2 text-lg font-semibold text-gray-300 transition-all hover:bg-primary-500 hover:text-white',
										{ 'bg-primary-500 text-white': game.difficulty === opt.value }
									)}
									onclick={() => game.setDifficulty(opt.value)}
								>
									{opt.label}
								</button>
							{/each}
						</div>
						{#if canRandomize}
							<div class="mt-4 grid w-full grid-cols-2 gap-2 rounded-xl bg-gray-600 p-2">
								{#each game.modeOptions as opt (opt.value)}
									<button
										class={cn(
											'rounded-lg bg-gray-600 px-2 py-1 font-semibold text-white transition-all hover:bg-primary-500 hover:text-white',
											{ 'bg-primary-500 text-white': game.mode === opt.value }
										)}
										onclick={() => game.setMode(opt.value)}
									>
										{opt.label}
									</button>
								{/each}
							</div>
						{/if}
						<div class="mt-4 w-full">
							<button
								class="w-full rounded-xl bg-primary-500 px-4 py-3 text-lg font-semibold text-white"
								onclick={() => game.start()}
							>
								START
							</button>
						</div>
					</div>
				{/if}
			</div>
		{:else}
			<div class="">
				<h2 class="mb-4 text-3xl font-bold text-primary-500">Hasil</h2>
				<div class="flex flex-col">
					<Result result={game.result} {letters} />
				</div>
				<div class="mt-4">
					<button
						class="w-full rounded-xl bg-primary-500 px-4 py-3 text-lg font-semibold text-white"
						onclick={game.reset}
					>
						RESTART
					</button>
				</div>
			</div>
		{/if}
	</div>

	<canvas
		class="pointer-events-none fixed left-0 top-0 z-20 h-full w-full"
		bind:this={confettiCanvas}
	></canvas>

	{#if locked}
		<LockedMessage />
	{/if}
</div>
