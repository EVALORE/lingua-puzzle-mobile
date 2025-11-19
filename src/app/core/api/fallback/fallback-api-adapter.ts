import {LevelRaw, PhraseRaw, PuzzleRaw} from "./fallback-raw-models";
import {Level, Levels, Phrase, Phrases, Puzzle, Puzzles} from "../api-models";

export class FallbackApiAdapter {
   adaptLevel(data: LevelRaw): Level {
    return {
      id: 0,
    };
  }

   adaptLevels(data: LevelRaw[]): Levels {
    return data.map(item => this.adaptLevel(item));
  }

   adaptPuzzle(data: PuzzleRaw): Puzzle {
    return {
      artworkId: "",
      levelId: 0,
      id: 0,
    };
  }

   adaptPuzzles(data: PuzzleRaw[]): Puzzles {
    return data.map(item => this.adaptPuzzle(item));
  }

   adaptPhrase(data: PhraseRaw): Phrase {
    return {
      orderInPuzzle: 0,
      id: String(data.id),
      puzzleId: 0,
      sentenceTextEng: data.sentenceTranslation,
      sentenceTextRu: "",
      sentenceTextRo: "",
      targetTerm: data.term,
      targetTranslation: data.sentenceTranslation,
    };
  }

   adaptPhrases(data: PhraseRaw[]): Phrases {
    return data.map(item => this.adaptPhrase(item));
  }
}
