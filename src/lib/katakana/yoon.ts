export const katakanaYoonLetters = (): Letter[] => [
	{ letter: 'キャ', romaji: 'kya' },
	{ letter: 'キュ', romaji: 'kyu' },
	{ letter: 'キョ', romaji: 'kyo' },

	{ letter: 'ギャ', romaji: 'gya' },
	{ letter: 'ギュ', romaji: 'gyu' },
	{ letter: 'ギョ', romaji: 'gyo' },

	{ letter: 'シャ', romaji: 'sha' },
	{ letter: 'シュ', romaji: 'shu' },
	{ letter: 'ショ', romaji: 'sho' },

	{ letter: 'ジャ', romaji: 'ja' },
	{ letter: 'ジュ', romaji: 'ju' },
	{ letter: 'ジョ', romaji: 'jo' },

	{ letter: 'チャ', romaji: 'cha' },
	{ letter: 'チュ', romaji: 'chu' },
	{ letter: 'チョ', romaji: 'cho' },

	{ letter: 'ニャ', romaji: 'nya' },
	{ letter: 'ニュ', romaji: 'nyu' },
	{ letter: 'ニョ', romaji: 'nyo' },

	{ letter: 'ヒャ', romaji: 'hya' },
	{ letter: 'ヒュ', romaji: 'hyu' },
	{ letter: 'ヒョ', romaji: 'hyo' },

	{ letter: 'ビャ', romaji: 'bya' },
	{ letter: 'ビュ', romaji: 'byu' },
	{ letter: 'ビョ', romaji: 'byo' },

	{ letter: 'ピャ', romaji: 'pya' },
	{ letter: 'ピュ', romaji: 'pyu' },
	{ letter: 'ピョ', romaji: 'pyo' },

	{ letter: 'ミャ', romaji: 'mya' },
	{ letter: 'ミュ', romaji: 'myu' },
	{ letter: 'ミョ', romaji: 'myo' },

	{ letter: 'リャ', romaji: 'rya' },
	{ letter: 'リュ', romaji: 'ryu' },
	{ letter: 'リョ', romaji: 'ryo' }
];

export const katakanaYoonSheet = (): Column[] =>
	katakanaYoonLetters().map((letter) => ({
		type: 'question',
		...letter
	}));
