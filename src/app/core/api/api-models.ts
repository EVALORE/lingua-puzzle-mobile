export type Level = {
  id: number
}

export type Levels = Array<Level>

export type Puzzle = {
  artworkId: string;
  levelId: number;
  id: number;
}

export type Puzzles = Array<Puzzle>;

export type Phrases = Array<Phrase>;

export interface Phrase {
  orderInPuzzle: number;
  id: string;
  puzzleId: number;
  sentenceTextEng: string;
  sentenceTextRu: string;
  sentenceTextRo: string;
  targetTerm: string;
  targetTranslation: string;
}
