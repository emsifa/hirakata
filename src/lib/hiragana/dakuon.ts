export const hiraganaDakuonLetters = (): Letter[] => [
	{ letter: 'が', romaji: 'ga' },
	{ letter: 'ぎ', romaji: 'gi' },
	{ letter: 'ぐ', romaji: 'gu' },
	{ letter: 'げ', romaji: 'ge' },
	{ letter: 'ご', romaji: 'go' },

	{ letter: 'ざ', romaji: 'za' },
	{ letter: 'じ', romaji: 'zi' },
	{ letter: 'ず', romaji: 'zu' },
	{ letter: 'ぜ', romaji: 'ze' },
	{ letter: 'ぞ', romaji: 'zo' },

	{ letter: 'だ', romaji: 'da' },
	{ letter: 'ぢ', romaji: 'di' },
	{ letter: 'づ', romaji: 'du' },
	{ letter: 'で', romaji: 'de' },
	{ letter: 'ど', romaji: 'do' },

	{ letter: 'ば', romaji: 'ba' },
	{ letter: 'び', romaji: 'bi' },
	{ letter: 'ぶ', romaji: 'bu' },
	{ letter: 'べ', romaji: 'be' },
	{ letter: 'ぼ', romaji: 'bo' },

	{ letter: 'ぱ', romaji: 'pa' },
	{ letter: 'ぴ', romaji: 'pi' },
	{ letter: 'ぷ', romaji: 'pu' },
	{ letter: 'ぺ', romaji: 'pe' },
	{ letter: 'ぽ', romaji: 'po' }
];

export const hiraganaDakuonSheet = (): SheetGameColumn[] => [
	{ type: 'blank' },
	{ type: 'header', value: 'A' },
	{ type: 'header', value: 'I' },
	{ type: 'header', value: 'U' },
	{ type: 'header', value: 'E' },
	{ type: 'header', value: 'O' },

	{ type: 'letter', value: 'GA' },
	{ type: 'question', romaji: 'ga', letter: 'が' },
	{ type: 'question', romaji: 'gi', letter: 'ぎ' },
	{ type: 'question', romaji: 'gu', letter: 'ぐ' },
	{ type: 'question', romaji: 'ge', letter: 'げ' },
	{ type: 'question', romaji: 'go', letter: 'ご' },

	{ type: 'letter', value: 'ZA' },
	{ type: 'question', romaji: 'za', letter: 'ざ' },
	{ type: 'question', romaji: 'zi', letter: 'じ' },
	{ type: 'question', romaji: 'zu', letter: 'ず' },
	{ type: 'question', romaji: 'ze', letter: 'ぜ' },
	{ type: 'question', romaji: 'zo', letter: 'ぞ' },

	{ type: 'letter', value: 'DA' },
	{ type: 'question', romaji: 'da', letter: 'だ' },
	{ type: 'question', romaji: 'di', letter: 'ぢ' },
	{ type: 'question', romaji: 'du', letter: 'づ' },
	{ type: 'question', romaji: 'de', letter: 'で' },
	{ type: 'question', romaji: 'do', letter: 'ど' },

	{ type: 'letter', value: 'BA' },
	{ type: 'question', romaji: 'ba', letter: 'ば' },
	{ type: 'question', romaji: 'bi', letter: 'び' },
	{ type: 'question', romaji: 'bu', letter: 'ぶ' },
	{ type: 'question', romaji: 'be', letter: 'べ' },
	{ type: 'question', romaji: 'bo', letter: 'ぼ' },

	{ type: 'letter', value: 'PA' },
	{ type: 'question', romaji: 'pa', letter: 'ぱ' },
	{ type: 'question', romaji: 'pi', letter: 'ぴ' },
	{ type: 'question', romaji: 'pu', letter: 'ぷ' },
	{ type: 'question', romaji: 'pe', letter: 'ぺ' },
	{ type: 'question', romaji: 'po', letter: 'ぽ' }
];
