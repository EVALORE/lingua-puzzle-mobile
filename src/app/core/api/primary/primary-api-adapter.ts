import {Level, Puzzle, Phrase, Levels, Puzzles, Phrases} from '../api-models';
import {LevelRaw, PhraseRaw, PuzzleRaw} from "./primary-raw-models";

export class PrimaryApiAdapter {
  adaptLevel(data: LevelRaw): Level {
    return {
      id: data.level_id,
    };
  }

  adaptLevels(data: LevelRaw[]): Levels {
    return data.map(this.adaptLevel);
  }

  adaptPuzzle(data: PuzzleRaw): Puzzle {
    return {
      artworkId: data.artwork_id,
      levelId: data.level_id,
      id: data.puzzle_id,
    };
  }

  adaptPuzzles(data: PuzzleRaw[]): Puzzles {
    return data.map(this.adaptPuzzle);
  }

  adaptPhrase(data: PhraseRaw): Phrase {
    return {
      orderInPuzzle: data.order_in_puzzle,
      id: data.phrase_id,
      puzzleId: data.puzzle_id,
      sentenceTextEng: data.sentence_text_eng,
      sentenceTextRu: data.sentence_text_ru,
      sentenceTextRo: data.sentence_text_ro,
      targetTerm: data.target_term,
      targetTranslation: data.target_translation,
    };
  }

  adaptPhrases(data: PhraseRaw[]): Phrases {
    return data.map(this.adaptPhrase);
  }
}

