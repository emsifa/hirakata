export enum Feature {
	RANDOM_HIRAGANA = 'random_hiragana',
	RANDOM_KATAKANA = 'random_katakana',
	HIRAGANA_DAKUON = 'hiragana_dakuon',
	HIRAGANA_YOON = 'hiragana_yoon',
	KATAKANA_DAKUON = 'katakana_dakuon',
	KATAKANA_YOON = 'katakana_yoon'
}

const FEATURES_KEY = 'features';

export function addFeature(feature: Feature): void {
	const features = getFeatures();
	if (!features.includes(feature)) {
		features.push(feature);
	}
	localStorage.setItem(FEATURES_KEY, JSON.stringify(features));
}

export function hasFeature(feature: Feature): boolean {
	return getFeatures().includes(feature);
}

export function getFeatures() {
	try {
		const features = localStorage.getItem(FEATURES_KEY);
		if (features) {
			return JSON.parse(features) as Feature[];
		} else {
			return [];
		}
	} catch {
		return [];
	}
}

export function meetsRandomHiraganaRequirements(result: Result): boolean {
	const difficultyRequirements = ['hard', 'medium'];
	const minHighestStreak = 30;
	const minLettersAnswered = 46;

	return (
		minLettersAnswered >= result.letters.length &&
		difficultyRequirements.includes(result.difficulty) &&
		result.highestStreak >= minHighestStreak
	);
}

export function meetsRandomKatakanaRequirements(result: Result): boolean {
	const difficultyRequirements = ['hard', 'medium'];
	const minHighestStreak = 30;
	const minLettersAnswered = 46;

	return (
		minLettersAnswered >= result.letters.length &&
		difficultyRequirements.includes(result.difficulty) &&
		result.highestStreak >= minHighestStreak
	);
}

export function meetsHiraganaDakuonRequirements(result: Result): boolean {
	const difficultyRequirements = ['hard', 'medium'];
	const minLettersAnswered = 46;
	const minHighestStreak = 30;

	return (
		minLettersAnswered >= result.letters.length &&
		difficultyRequirements.includes(result.difficulty) &&
		result.highestStreak >= minHighestStreak
	);
}
