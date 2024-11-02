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

	type SheetGameQuestionColumn = { type: 'question'; romaji: string; letter: string };

	type SheetGameGameplay = {
		difficulty: SheetGameDifficulty;
		mode: SheetGameMode;
	};

	type SheetGameColumn =
		| { type: 'blank' }
		| { type: 'header'; value: string }
		| { type: 'letter'; value: string }
		| SheetGameQuestionColumn;

	type SheetGameDifficulty = 'easy' | 'medium' | 'hard';

	type SheetGameMode = 'sequence' | 'random';

	type SheetGameQuestion = {
		letter: string;
		romaji: string;
		attempts: number;
		time: number;
	};

	type SheetGameResult = {
		gameplay: SheetGameGameplay;
		highestStreak: number;
		totalLetters: number;
		totalTime: number;
		letters: string[];
	};
}

export {};
