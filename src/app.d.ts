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

	type Column =
		| { type: 'blank' }
		| { type: 'header'; value: string }
		| { type: 'letter'; value: string }
		| { type: 'question'; romaji: string; letter: string };
}

export {};
