export type Point = [number, number];
export type PathData = Point[];

export type LetterPath = {
	romaji: string;
	letter: string;
	paths: string[];
};

export type Question = LetterPath;
