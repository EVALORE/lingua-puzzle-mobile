import {inject, Injectable} from '@angular/core';
import {catchError, tap, timeout} from "rxjs";
import {PrimaryApiClient} from "./primary/primary-api-client";
import {FallbackApiClient} from "./fallback/fallback-api-client";

@Injectable({
  providedIn: 'root'
})
export class Api {
  private readonly primaryApi = inject(PrimaryApiClient);
  private readonly fallbackApi = inject(FallbackApiClient);

  public getLevels() {
    return this.primaryApi.getLevels().pipe(
      timeout(5000),
      catchError(() => {
        return this.fallbackApi.getLevels().pipe(
          tap(levels => console.log(levels))
        )
      })
    )
  }

  public getPuzzles(level: number) {
    return this.primaryApi.getPuzzles(level).pipe(
      timeout(5000),
      catchError(() => {
        return this.fallbackApi.getPuzzles(level).pipe(
          tap(levels => console.log(levels))
        )
      })
    )
  }

  public getPuzzle(puzzleId: number) {
    return this.primaryApi.getPuzzle(puzzleId).pipe(
      catchError(() => {
        return this.fallbackApi.getPuzzle(puzzleId)
      })
    )
  }

  public getPhrases(puzzleId: number) {
    return this.primaryApi.getPhrases(puzzleId).pipe(
      catchError(() => {
        return this.fallbackApi.getPhrases(puzzleId)
      })
    )
  }
}
