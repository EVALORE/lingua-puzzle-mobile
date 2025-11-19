import {Levels, Phrases, Puzzle, Puzzles} from "./api-models";
import {Observable} from "rxjs";

export interface ApiClient {
  getLevels(): Observable<Levels>;
  getPuzzles(levelId: number): Observable<Puzzles>;
  getPuzzle(puzzleId: number): Observable<Puzzle>;
  getPhrases(puzzleId: number): Observable<Phrases>;
}
