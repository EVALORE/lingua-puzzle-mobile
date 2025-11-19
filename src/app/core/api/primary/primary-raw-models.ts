export interface LevelRaw {
  level_id: number;
}

export interface PuzzleRaw {
  artwork_id: string;
  level_id: number;
  puzzle_id: number;
}

export interface PhraseRaw {
  order_in_puzzle: number;
  phrase_id: string;
  puzzle_id: number;
  sentence_text_eng: string;
  sentence_text_ru: string;
  sentence_text_ro: string;
  target_term: string;
  target_translation: string;
}

export interface UserRaw {
  user_id: number;
  username: string;
  email: string;
}
