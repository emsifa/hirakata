export const katakanaDakuonLetters = (): Letter[] => [
	{ letter: 'ガ', romaji: 'ga' },
	{ letter: 'ギ', romaji: 'gi' },
	{ letter: 'グ', romaji: 'gu' },
	{ letter: 'ゲ', romaji: 'ge' },
	{ letter: 'ゴ', romaji: 'go' },

	{ letter: 'ザ', romaji: 'za' },
	{ letter: 'ジ', romaji: 'zi' },
	{ letter: 'ズ', romaji: 'zu' },
	{ letter: 'ゼ', romaji: 'ze' },
	{ letter: 'ゾ', romaji: 'zo' },

	{ letter: 'ダ', romaji: 'da' },
	{ letter: 'ヂ', romaji: 'di' },
	{ letter: 'ヅ', romaji: 'du' },
	{ letter: 'デ', romaji: 'de' },
	{ letter: 'ド', romaji: 'do' },

	{ letter: 'バ', romaji: 'ba' },
	{ letter: 'ビ', romaji: 'bi' },
	{ letter: 'ブ', romaji: 'bu' },
	{ letter: 'ベ', romaji: 'be' },
	{ letter: 'ボ', romaji: 'bo' },

	{ letter: 'パ', romaji: 'pa' },
	{ letter: 'ピ', romaji: 'pi' },
	{ letter: 'プ', romaji: 'pu' },
	{ letter: 'ペ', romaji: 'pe' },
	{ letter: 'ポ', romaji: 'po' }
];

export const katakanaDakuonSheet = (): SheetGameColumn[] => [
	{ type: 'blank' },
	{ type: 'header', value: 'A' },
	{ type: 'header', value: 'I' },
	{ type: 'header', value: 'U' },
	{ type: 'header', value: 'E' },
	{ type: 'header', value: 'O' },

	{ type: 'letter', value: 'GA' },
	{ type: 'question', romaji: 'ga', letter: 'ガ' },
	{ type: 'question', romaji: 'gi', letter: 'ギ' },
	{ type: 'question', romaji: 'gu', letter: 'グ' },
	{ type: 'question', romaji: 'ge', letter: 'ゲ' },
	{ type: 'question', romaji: 'go', letter: 'ゴ' },

	{ type: 'letter', value: 'ZA' },
	{ type: 'question', romaji: 'za', letter: 'ザ' },
	{ type: 'question', romaji: 'zi', letter: 'ジ' },
	{ type: 'question', romaji: 'zu', letter: 'ズ' },
	{ type: 'question', romaji: 'ze', letter: 'ゼ' },
	{ type: 'question', romaji: 'zo', letter: 'ゾ' },

	{ type: 'letter', value: 'DA' },
	{ type: 'question', romaji: 'da', letter: 'ダ' },
	{ type: 'question', romaji: 'di', letter: 'ヂ' },
	{ type: 'question', romaji: 'du', letter: 'ヅ' },
	{ type: 'question', romaji: 'de', letter: 'デ' },
	{ type: 'question', romaji: 'do', letter: 'ド' },

	{ type: 'letter', value: 'BA' },
	{ type: 'question', romaji: 'ba', letter: 'バ' },
	{ type: 'question', romaji: 'bi', letter: 'ビ' },
	{ type: 'question', romaji: 'bu', letter: 'ブ' },
	{ type: 'question', romaji: 'be', letter: 'ベ' },
	{ type: 'question', romaji: 'bo', letter: 'ボ' },

	{ type: 'letter', value: 'PA' },
	{ type: 'question', romaji: 'pa', letter: 'パ' },
	{ type: 'question', romaji: 'pi', letter: 'ピ' },
	{ type: 'question', romaji: 'pu', letter: 'プ' },
	{ type: 'question', romaji: 'pe', letter: 'ペ' },
	{ type: 'question', romaji: 'po', letter: 'ポ' }
];
