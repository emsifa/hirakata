// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type Letter = {
		letter: string;
		romaji: string;
	};

	type QuestionColumn = { type: 'question'; romaji: string; letter: string };

	type Gameplay = {
		difficulty: Difficulty;
		mode: GameplayMode;
	};

	type Column =
		| { type: 'blank' }
		| { type: 'header'; value: string }
		| { type: 'letter'; value: string }
		| QuestionColumn;

	type Difficulty = 'easy' | 'medium' | 'hard';

	type GameplayMode = 'sequence' | 'random';

	type Question = {
		letter: string;
		romaji: string;
		attempts: number;
		time: number;
	};

	type Result = {
		gameplay: Gameplay;
		highestStreak: number;
		totalLetters: number;
		totalTime: number;
		letters: string[];
	};
}

export {};
