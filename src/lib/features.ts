export enum Feature {
	RANDOM_HIRAGANA = 'random_hiragana',
	RANDOM_KATAKANA = 'random_katakana'
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
