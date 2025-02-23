type Point = [number, number];
type PathData = Point[];

export function createGame() {
	let isDrawing = $state(false);
	let playerPathData: PathData = $state([]);
	let similarity: number | null = $state(null);

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
		playerPathData = [getCoords(event)];
		isDrawing = true;
	}

	function draw(event: MouseEvent | TouchEvent) {
		if (!isDrawing) return;
		event.preventDefault();
		playerPathData = [...playerPathData, getCoords(event)];
	}

	function stopDrawing() {
		if (isDrawing) {
			isDrawing = false;
		}
	}

	function clearPath() {
		playerPathData = [];
		similarity = 0;
	}

	function euclideanDistance(p1: Point, p2: Point) {
		return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
	}

	function frechetDistance(P: PathData, Q: PathData) {
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

	function samplePathPoints(pathElement: SVGPathElement, numSamples: number): Point[] {
		const length = pathElement.getTotalLength();
		const sampledPoints: Point[] = [];
		for (let i = 0; i <= numSamples; i++) {
			const pos = pathElement.getPointAtLength((i / numSamples) * length);
			sampledPoints.push([pos.x, pos.y]);
		}
		return sampledPoints;
	}

	function getPathDimention(pathElement: SVGPathElement): [number, number] {
		const rect = pathElement.getBoundingClientRect();
		return [rect.width, rect.height];
	}

	function calculateSimilarity(
		numSamples = 30,
		questionPath: SVGPathElement,
		playerPath: SVGPathElement
	) {
		const questionPoints = samplePathPoints(questionPath, numSamples);
		const playerPoints = samplePathPoints(playerPath, numSamples);

		if (questionPoints.length === 0 || playerPoints.length === 0) {
			similarity = null;
			return;
		}

		const [width, height] = getPathDimention(questionPath);

		const frechetDist = frechetDistance(questionPoints, playerPoints);
		const maxDistance = Math.sqrt(width ** 2 + height ** 2); // Jarak maksimum dalam SVG
		const sim = Math.max(0, 100 - (frechetDist / maxDistance) * 100);
		similarity = sim;
	}

	return {
		get similarity() {
			return similarity;
		},
		get playerPathData() {
			return playerPathData;
		},
		clearPath,
		startDrawing,
		draw,
		stopDrawing,
		calculateSimilarity
	};
}
