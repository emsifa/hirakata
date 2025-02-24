export function playSoundWrong() {
	const audio = new Audio('/sounds/wrong.mp3');
	audio.play();
}

export function playSoundCorrect() {
	const audio = new Audio('/sounds/correct.mp3');
	audio.play();
}
