import type { PathData, Question } from './types';
import {
	calculateSimilarity,
	generateRandomizedQuestions,
	getPathDimention,
	getPathPoints
} from './utils';

export function createGame({
	onQuestionDone,
	onPathIncorrect,
	onEnd
}: {
	onQuestionDone?: () => void;
	onPathIncorrect?: () => void;
	onEnd?: () => void;
}) {
	let isDrawing = $state(false);
	let drawPathData: PathData = $state([]);
	let similarity: number | null = $state(null);
	let showHint = $state(false);
	let started = $state(false);

	let questions: Question[] = $state([]);
	let questionIndex: number = $state(-1);
	let questionPathIndex: number = $state(-1);
	let answeredPaths: string[] = $state([]);
	let similarities: number[] = $state([]);

	const question = $derived(questions[questionIndex] ?? null);
	const questionPath = $derived(question ? question.paths[questionPathIndex] : null);
	const isLastQuestion = $derived(questionIndex === questions.length - 1);
	const isLastPath = $derived(question ? questionPathIndex === question.paths.length - 1 : false);

	function nextQuestion() {
		if (isLastQuestion) {
			setTimeout(end, 1000);
			return;
		}

		answeredPaths = [];
		questionIndex++;
		questionPathIndex = 0;
	}

	function nextPath() {
		answeredPaths.push(questionPath!);

		if (isLastPath) {
			onQuestionDone?.();
			setTimeout(() => {
				nextQuestion();
			}, 1000);
			return;
		}

		questionPathIndex++;
	}

	function submitPath(questionPath: SVGPathElement, answerPath: SVGPathElement) {
		const questionPoints = getPathPoints(questionPath, 30);
		const playerPoints = getPathPoints(answerPath, 30);
		const dim = getPathDimention(questionPath);

		const sim = calculateSimilarity(questionPoints, playerPoints, dim);
		clearPath();

		if (sim < 70) {
			onPathIncorrect?.();
			return;
		}

		similarities.push(sim);
		nextPath();
	}

	function reset() {
		questionIndex = -1;
		questionPathIndex = -1;
		answeredPaths = [];
		similarities = [];
	}

	function end() {
		started = false;
		reset();
		onEnd?.();
	}

	function start() {
		questions = generateRandomizedQuestions();
		started = true;
		reset();
		nextQuestion();
	}

	function getCoords(event: MouseEvent | TouchEvent): [number, number] {
		const svgRect = (event.currentTarget as SVGElement).getBoundingClientRect();
		const x =
			(event instanceof MouseEvent ? event.clientX : event.touches[0].clientX) - svgRect.left;
		const y =
			(event instanceof MouseEvent ? event.clientY : event.touches[0].clientY) - svgRect.top;
		return [x, y];
	}

	function startDrawing(event: MouseEvent | TouchEvent) {
		event.preventDefault();
		drawPathData = [getCoords(event)];
		isDrawing = true;
	}

	function draw(event: MouseEvent | TouchEvent) {
		if (!isDrawing) return;
		event.preventDefault();
		drawPathData = [...drawPathData, getCoords(event)];
	}

	function stopDrawing() {
		if (isDrawing) {
			isDrawing = false;
		}
	}

	function clearPath() {
		drawPathData = [];
		similarity = 0;
	}

	function blinkHint(duration = 1000) {
		showHint = true;
		setTimeout(() => {
			showHint = false;
		}, duration);
	}

	return {
		get similarity() {
			return similarity;
		},
		get drawPathData() {
			return drawPathData;
		},
		get question() {
			return question;
		},
		get questionIndex() {
			return questionIndex;
		},
		get questionPathIndex() {
			return questionPathIndex;
		},
		get questionPath() {
			return questionPath;
		},
		get drawPathStr() {
			return `M ${drawPathData.map((p) => p.join(' ')).join(' L ')}`;
		},
		get answeredPaths() {
			// get question paths that have been answered
			return answeredPaths;
		},
		get similarities() {
			return similarities;
		},
		get showHint() {
			return showHint;
		},
		get started() {
			return started;
		},
		blinkHint,
		start,
		nextPath,
		submitPath,
		clearPath,
		startDrawing,
		draw,
		stopDrawing
	};
}
