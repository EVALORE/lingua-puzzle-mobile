export interface LevelRaw {
  puzzles: PuzzleRaw[];
  totalPuzzles: number
}

export interface PuzzleRaw {
  id: string;
  name: string;
  artworkUrl: string;
  author: string;
  year: string;
}

export interface PhraseRaw {
  id: number;
  term: string;
  sentenceTranslation: string;
  sentence: string;
}
