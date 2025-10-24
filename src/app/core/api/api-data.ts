export type Levels = Array<{
  level_id: number;
}>

export type Puzzles = Array<{
  artwork_id: string;
  level_id: number;
  puzzle_id: number;
}>

export type Phrases = Array<{
  order_in_puzzle: number;
  phrase_id: string;
  puzzle_id: number;
  sentence_text_eng: string;
  sentence_text_ru: string;
  sentence_text_ro: string;
  target_term: string;
  target_translation: string;
}>
