import { hiraganaDakuonLetters } from '$lib/hiragana/dakuon';
import { hiraganaSeionLetters } from '$lib/hiragana/seion';
import { hiraganaYoonLetters } from '$lib/hiragana/yoon';
import { katakanaDakuonLetters } from '$lib/katakana/dakuon';
import { katakanaSeionLetters } from '$lib/katakana/seion';
import { katakanaYoonLetters } from '$lib/katakana/yoon';
import { alphabetical, clone, random, range, shuffle } from 'radash';

const hiraganaLetters = [...hiraganaSeionLetters(), ...hiraganaDakuonLetters()];
const katakanaLetters = [...katakanaSeionLetters(), ...katakanaDakuonLetters()];

const hiraganaYoon = hiraganaYoonLetters();
const katakanaYoon = katakanaYoonLetters();

const oneOf = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

export function generateRandomWord(
	{
		length,
		katakana = false,
		hiragana = true
	}: {
		length?: number;
		katakana?: boolean;
		hiragana?: boolean;
	} = {
		hiragana: true,
		katakana: false
	}
) {
	length = length ?? random(2, 5);

	const letters = [...(katakana ? katakanaLetters : []), ...(hiragana ? hiraganaLetters : [])];

	let word: Letter[] = [...range(1, length)].map(() => oneOf(letters));

	if (hiragana) {
		word = replaceYoon(word, hiraganaYoon);
	}

	if (katakana) {
		word = replaceYoon(word, katakanaYoon);
	}

	return word;
}

export function generateOptions(
	count: number,
	question: Letter[],
	hiragana?: boolean,
	katakana?: boolean
) {
	const answers = shuffle(question.map((letter) => clone(letter)));
	if (answers.length === count) {
		return answers;
	}

	const letters = [...(katakana ? katakanaLetters : []), ...(hiragana ? hiraganaLetters : [])];
	const remaining = count - answers.length;
	const rest = shuffle(letters).slice(0, remaining);

	return alphabetical([...answers, ...rest], (l) => l.romaji);
}

function replaceYoon(word: Letter[], yoons: Letter[]): Letter[] {
	const replaced = [];

	let lastLetterIsYoon = false;
	for (let i = 0; i < word.length - 1; i++) {
		const a = word[i];
		const b = word[i + 1];
		const w = a.letter + toYoonCase(b.letter);

		const yoon = yoons.find((y) => y.letter === w);
		if (yoon) {
			replaced.push(yoon);
			lastLetterIsYoon = i === word.length - 2;
		} else {
			replaced.push(a);
		}
	}

	if (!lastLetterIsYoon) {
		replaced.push(word[word.length - 1]);
	}

	return replaced;
}

function toYoonCase(letter: string): string {
	const pairs: { [key: string]: string } = {
		あ: 'ぁ',
		い: 'ぃ',
		う: 'ぅ',
		え: 'ぇ',
		お: 'ぉ',
		つ: 'っ',
		や: 'ゃ',
		ゆ: 'ゅ',
		よ: 'ょ',
		わ: 'ゎ',
		ア: 'ァ',
		イ: 'ィ',
		ウ: 'ゥ',
		エ: 'ェ',
		オ: 'ォ',
		カ: 'ヵ',
		ク: 'ㇰ',
		ケ: 'ヶ',
		シ: 'ㇱ',
		ス: 'ㇲ',
		ツ: 'ッ',
		ト: 'ㇳ',
		ヌ: 'ㇴ',
		ハ: 'ㇵ',
		ヒ: 'ㇶ',
		フ: 'ㇷ',
		プ: 'ㇷ゚',
		ヘ: 'ㇸ',
		ホ: 'ㇹ',
		ム: 'ㇺ',
		ヤ: 'ャ',
		ユ: 'ュ',
		ヨ: 'ョ',
		ラ: 'ㇻ',
		リ: 'ㇼ',
		ル: 'ㇽ',
		レ: 'ㇾ',
		ロ: 'ㇿ',
		ワ: 'ヮ'
	};

	return pairs[letter] ?? letter;
}
