import { shuffle } from 'radash';
import type { PathData, Point, Question } from './types';
import { letters } from './letters';

export function euclideanDistance(p1: Point, p2: Point) {
	return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

export function frechetDistance(P: PathData, Q: PathData) {
	const m = P.length;
	const n = Q.length;
	const dp = Array.from({ length: m }, () => Array(n).fill(-1));

	function recursive(i: number, j: number) {
		if (dp[i][j] !== -1) return dp[i][j];
		const d = euclideanDistance(P[i], Q[j]);
		if (i === 0 && j === 0) {
			dp[i][j] = d;
		} else if (i === 0) {
			dp[i][j] = Math.max(d, recursive(i, j - 1));
		} else if (j === 0) {
			dp[i][j] = Math.max(d, recursive(i - 1, j));
		} else {
			dp[i][j] = Math.max(
				d,
				Math.min(recursive(i - 1, j), recursive(i, j - 1), recursive(i - 1, j - 1))
			);
		}
		return dp[i][j];
	}

	return recursive(m - 1, n - 1);
}

export function getPathPoints(pathElement: SVGPathElement, numSamples: number): Point[] {
	const length = pathElement.getTotalLength();
	const sampledPoints: Point[] = [];
	for (let i = 0; i <= numSamples; i++) {
		const pos = pathElement.getPointAtLength((i / numSamples) * length);
		sampledPoints.push([pos.x, pos.y]);
	}
	return sampledPoints;
}

export function getPathDimention(pathElement: SVGPathElement): [number, number] {
	const rect = pathElement.getBoundingClientRect();
	return [rect.width, rect.height];
}

export function calculateSimilarity(
	questionPoints: Point[],
	playerPoints: Point[],
	[width, height]: [number, number]
) {
	const frechetDist = frechetDistance(questionPoints, playerPoints);
	const maxDistance = Math.sqrt(width ** 2 + height ** 2); // Jarak maksimum dalam SVG
	const sim = Math.max(0, 100 - (frechetDist / maxDistance) * 100);

	return sim;
}

export function generateRandomizedQuestions(): Question[] {
	return shuffle(letters);
}
