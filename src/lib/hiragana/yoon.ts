export const hiraganaYoonLetters = (): Letter[] => [
	{ letter: 'きゃ', romaji: 'kya' },
	{ letter: 'きゅ', romaji: 'kyu' },
	{ letter: 'きょ', romaji: 'kyo' },

	{ letter: 'ぎゃ', romaji: 'gya' },
	{ letter: 'ぎゅ', romaji: 'gyu' },
	{ letter: 'ぎょ', romaji: 'gyo' },

	{ letter: 'しゃ', romaji: 'sha' },
	{ letter: 'しゅ', romaji: 'shu' },
	{ letter: 'しょ', romaji: 'sho' },

	{ letter: 'じゃ', romaji: 'ja' },
	{ letter: 'じゅ', romaji: 'ju' },
	{ letter: 'じょ', romaji: 'jo' },

	{ letter: 'ちゃ', romaji: 'cha' },
	{ letter: 'ちゅ', romaji: 'chu' },
	{ letter: 'ちょ', romaji: 'cho' },

	{ letter: 'にゃ', romaji: 'nya' },
	{ letter: 'にゅ', romaji: 'nyu' },
	{ letter: 'にょ', romaji: 'nyo' },

	{ letter: 'ひゃ', romaji: 'hya' },
	{ letter: 'ひゅ', romaji: 'hyu' },
	{ letter: 'ひょ', romaji: 'hyo' },

	{ letter: 'びゃ', romaji: 'bya' },
	{ letter: 'びゅ', romaji: 'byu' },
	{ letter: 'びょ', romaji: 'byo' },

	{ letter: 'ぴゃ', romaji: 'pya' },
	{ letter: 'ぴゅ', romaji: 'pyu' },
	{ letter: 'ぴょ', romaji: 'pyo' },

	{ letter: 'みゃ', romaji: 'mya' },
	{ letter: 'みゅ', romaji: 'myu' },
	{ letter: 'みょ', romaji: 'myo' },

	{ letter: 'りゃ', romaji: 'rya' },
	{ letter: 'りゅ', romaji: 'ryu' },
	{ letter: 'りょ', romaji: 'ryo' }
];

export const hiraganaYoonSheet = (): SheetGameColumn[] =>
	hiraganaYoonLetters().map((letter) => ({
		type: 'question',
		...letter
	}));
