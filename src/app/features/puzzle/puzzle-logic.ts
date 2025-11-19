import {computed, effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Tile} from "./types/tile";
import {Phrase} from "./types/game-data";
import {PositionStatus} from "./types/position-status";
import {getBoardWidthPx, TILE_HEIGHT} from "./consts/ui-layout";
import {arrayShuffle} from "src/app/shared/utils/array-shuffle";
import {Api} from "../../core/api/api";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {Puzzles} from "../../core/stores/puzzles";
import {switchMap} from "rxjs";

const DEFAULT_PHRASE_INDEX = 0;

@Injectable()
export class PuzzleLogic {
  private readonly http = inject(Api);
  private readonly puzzles = inject(Puzzles);

  public readonly puzzlePhrases = toSignal(
    toObservable(this.puzzles.selectedPuzzleId).pipe(
      switchMap(puzzleId => puzzleId !== null ? this.http.getPhrases(puzzleId) : [])
    ),{initialValue: []}
  );

  public readonly phrase = computed(() => this.puzzlePhrases()[this.phraseIndex()]);
  public readonly phraseIndex = signal<number>(DEFAULT_PHRASE_INDEX);
  public readonly solvedTiles = signal<Tile[][]>([]);
  public readonly availableTiles = signal<Tile[]>([]);
  public readonly placedTiles = signal<Tile[]>([]);

  public hasNoAvailableTiles = computed(() => !this.availableTiles().length);
  public areTilesPlacedCorrectly = computed(() =>
    this.hasNoAvailableTiles()
      ? this.placedTiles().every((card) => card.positionStatus === PositionStatus.CORRECT)
      : false,
  );
  public isPuzzleSolved = computed(() => this.solvedTiles().length === this.puzzlePhrases().length);

  constructor() {
    effect(() => {
      if (this.puzzlePhrases().length === 0) {
        return;
      }
      const tiles = this.createTilesFromSentence(this.phrase().sentenceTextEng, this.phraseIndex());
      this.placedTiles.set(
        tiles.map((tile) => ({
          ...tile,
          positionStatus: PositionStatus.PENDING,
        })),
      );

      this.clearPlacedTiles();
      this.availableTiles.set(arrayShuffle(tiles));
    });
  }

  public newPuzzleWords(): void {
    this.clearAll();
  }

  public handleNextStep(): void {
    this.movePlacedToSolved();

    if (this.isPuzzleSolved()) {
      return;
    }

    this.nextWordIndex();
  }

  public autocompleteResult(): void {
    this.placedTiles.update(this.sortTilesByInitialIndex.bind(this));
    this.validatePlacedStatus();
  }

  public validatePlacedStatus(): void {
    this.placedTiles.update(this.updateTilesPositionStatus.bind(this));
  }

  public clearAll(): void {
    this.clearSolvedTiles();
    this.clearPlacedTiles();
    this.setWordIndex();
  }

  private clearSolvedTiles(): void {
    this.solvedTiles.set([]);
  }

  private clearPlacedTiles(): void {
    this.placedTiles.set([]);
  }

  public nextWordIndex(): void {
    this.setWordIndex(this.phraseIndex() + 1);
  }

  public setWordIndex(sentenceIndex = DEFAULT_PHRASE_INDEX): void {
    this.phraseIndex.set(sentenceIndex);
  }

  public movePlacedToSolved(): void {
    this.solvedTiles.update((completed) => [...completed, this.placedTiles()]);
    this.clearPlacedTiles();
  }

  public moveCardToPlaced(cardIndex: number): void {
    this.moveCard(cardIndex, this.availableTiles, this.placedTiles);
  }

  public moveCardToAvailable(cardIndex: number): void {
    this.placedTiles.update(this.resetTilesPositionStatus.bind(this));
    this.moveCard(cardIndex, this.placedTiles, this.availableTiles);
  }

  private moveCard(
    cardIndex: number,
    from: WritableSignal<Tile[]>,
    to: WritableSignal<Tile[]>,
  ): void {
    to.update((cards) => [...cards, from()[cardIndex]]);
    from.update((cards) => cards.filter((_, index) => index !== cardIndex));
  }

  public createTilesFromSentence(sentence: string, wordIndex: number): Tile[] {
    let xOffsetSum = 0;
    return sentence.split(' ').map((word, index): Tile => {
      const tile = {
        word,
        width: this.calculateTileWidth(word, sentence),
        initialIndex: index,
        positionStatus: PositionStatus.PENDING,
        xOffset: xOffsetSum,
        yOffset: TILE_HEIGHT.NUMBER * wordIndex,
      };

      xOffsetSum += tile.width;

      return tile;
    });
  }

  private calculateTileWidth(word: string, sentence: string): number {
    return (word.length / sentence.replace(/ /gu, '').length) * getBoardWidthPx();
  }

  private sortTilesByInitialIndex(tiles: Tile[]): Tile[] {
    return tiles.sort((a, b) => a.initialIndex - b.initialIndex);
  }

  private updateTilesPositionStatus(tiles: Tile[]): Tile[] {
    return tiles.map((tile, index) => ({
      ...tile,
      positionStatus: index === tile.initialIndex ? PositionStatus.CORRECT : PositionStatus.WRONG,
    }));
  }

  private resetTilesPositionStatus(tiles: Tile[]): Tile[] {
    return tiles.map((tile) => ({...tile, positionStatus: PositionStatus.PENDING}));
  }
}
