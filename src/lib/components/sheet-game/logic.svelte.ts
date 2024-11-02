import { clone, shuffle } from 'radash';

const difficultyOptions: {
	label: string;
	value: SheetGameDifficulty;
}[] = [
	{ label: 'Mudah', value: 'easy' },
	{ label: 'Sedang', value: 'medium' },
	{ label: 'Sulit', value: 'hard' }
];

const modeOptions: {
	label: string;
	value: 'sequence' | 'random';
}[] = [
	{ label: 'Runut', value: 'sequence' },
	{ label: 'Acak', value: 'random' }
];

export function createGame({
	letters,
	onStarted,
	onNext,
	onCorrect,
	onWrong,
	onReset,
	onFinished
}: {
	letters: Letter[];
	onNext: (letter: Letter) => void;
	onCorrect: () => void;
	onWrong: () => void;
	onReset: (gameplay: SheetGameGameplay) => void;
	onFinished: (result: SheetGameResult) => void;
	onStarted: (gameplay: SheetGameGameplay) => void;
}) {
	let locked: boolean = $state(false);
	let difficulty: SheetGameDifficulty = $state('easy');
	let mode: SheetGameMode = $state('sequence');

	let shuffled: typeof letters = $state(clone(letters));
	let options: typeof letters = $state(clone(letters));
	let startedAt: Date | null = $state(null);

	let questions: SheetGameQuestion[] = $state([]);
	let questionIndex = $state(-1);

	let attempts = $state(0);
	let questionStartedAt = $state(0);
	let hearts = $state(5);
	let blink: {
		romaji: string;
		type: boolean;
	} | null = $state.raw(null);

	let highestStreak = $state(0);
	let currentStreak = $state(0);

	const question = $derived(questions[questionIndex] ?? null);
	const answered = $derived(questions.filter((q) => q.time > 0).map((q) => q.romaji));
	const gameplay = $derived({ difficulty, mode });

	let result: SheetGameResult | null = $state(null);

	return {
		get difficultyOptions() {
			return difficultyOptions;
		},
		get modeOptions() {
			return modeOptions;
		},
		get difficulty() {
			return difficulty;
		},
		get mode() {
			return mode;
		},
		get shuffled() {
			return shuffled;
		},
		get options() {
			return options;
		},
		get startedAt() {
			return startedAt;
		},
		get questions() {
			return questions;
		},
		get questionIndex() {
			return questionIndex;
		},
		get attempts() {
			return attempts;
		},
		get questionStartedAt() {
			return questionStartedAt;
		},
		get blink() {
			return blink;
		},
		get hearts() {
			return hearts;
		},
		get highestStreak() {
			return highestStreak;
		},
		get currentStreak() {
			return currentStreak;
		},
		get question() {
			return question;
		},
		get answered() {
			return answered;
		},
		get result() {
			return result;
		},

		setLocked(value: boolean) {
			locked = value;
		},

		setMode(value: SheetGameMode) {
			mode = value;
		},

		setDifficulty(value: SheetGameDifficulty) {
			difficulty = value;
		},

		start() {
			if (locked) {
				return;
			}

			questionIndex = -1;
			startedAt = new Date();
			shuffled = shuffle(letters);
			questions = clone(letters).map((letter) => ({
				...letter,
				attempts: 0,
				time: 0
			}));

			if (mode === 'random') {
				questions = shuffle(questions);
			}

			this.next();

			onStarted(gameplay);
		},

		reset() {
			startedAt = null;
			questions = [];
			questionIndex = -1;
			attempts = 0;
			questionStartedAt = 0;
			blink = null;
			hearts = 5;
			result = null;
			currentStreak = 0;

			onReset(gameplay);
		},

		next() {
			if (questionIndex + 1 < questions.length) {
				questionIndex++;
				attempts = 0;
				questionStartedAt = new Date().getTime();

				const q = questions[questionIndex];
				options = this.generateOptions(q);

				onNext(q);
			} else {
				this.finish();
			}
		},

		generateOptions(question: SheetGameQuestion): typeof letters {
			if (difficulty === 'hard') {
				return shuffle(shuffled.filter((l) => !answered.includes(l.romaji)));
			} else if (difficulty === 'medium') {
				const answer = { ...question };
				return shuffle([
					answer,
					...shuffle(letters.filter((l) => l.romaji !== answer.romaji)).slice(0, 9)
				]);
			} else if (difficulty === 'easy') {
				const answer = { ...question };
				return shuffle([
					answer,
					...shuffle(letters.filter((l) => l.romaji !== answer.romaji)).slice(0, 4)
				]);
			}

			return [];
		},

		answer(romaji: string) {
			if (!startedAt) return;

			const current = questions[questionIndex];
			const correct = current.romaji === romaji;
			current.attempts++;
			attempts++;

			return correct ? this.handleCorrect(current) : this.handleWrong();
		},

		handleCorrect(current: SheetGameQuestion) {
			current.time = new Date().getTime() - questionStartedAt;
			currentStreak += 1;
			if (currentStreak % 5 === 0 && hearts < 5) {
				hearts += 1;
			}

			this.doBlink(true, () => {
				this.next();
			});

			onCorrect();
		},

		handleWrong() {
			if (currentStreak > highestStreak) {
				highestStreak = currentStreak;
			}
			currentStreak = 0;

			hearts -= 1;
			if (hearts === 0) {
				this.finish();
			}

			this.doBlink(false);

			onWrong();
		},

		finish() {
			const totalLetters = answered.length;
			const totalTime = (new Date().getTime() - startedAt!.getTime()) / 1000;
			const resultLetters = letters.filter((l) => answered.includes(l.romaji)).map((l) => l.letter);
			highestStreak = Math.max(highestStreak, currentStreak);

			result = {
				gameplay,
				totalLetters: totalLetters,
				totalTime: totalTime,
				highestStreak: highestStreak,
				letters: resultLetters
			};

			onFinished(result);
		},

		doBlink(type: boolean, callback?: () => void) {
			blink = {
				romaji: question?.romaji,
				type: type
			};
			setTimeout(() => {
				blink = null;
				callback?.();
			}, 500);
		}
	};
}
