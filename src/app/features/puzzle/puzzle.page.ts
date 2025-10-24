import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonButton, IonCard, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {getBoardWidthPx, TILE_HEIGHT} from "./consts/ui-layout";
import {PuzzleLogic} from "./puzzle-logic";
import {TilesComponent} from "./tiles/tiles.component";

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.page.html',
  styleUrls: ['./puzzle.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, TilesComponent, IonButton],
  providers: [PuzzleLogic],
})
export class PuzzlePage {
  private readonly gameLogic = inject(PuzzleLogic);

  protected readonly phrase = this.gameLogic.phrase;
  protected readonly solvedTiles = this.gameLogic.solvedTiles;
  protected readonly availableTiles = this.gameLogic.availableTiles;
  protected readonly placedTiles = this.gameLogic.placedTiles;
  protected readonly hasNoAvailableTiles = this.gameLogic.hasNoAvailableTiles;
  protected readonly areTilesPlacedCorrectly = this.gameLogic.areTilesPlacedCorrectly;
  private isPuzzleSolved = this.gameLogic.isPuzzleSolved;

  protected readonly showButtons = computed(
    () => this.hasNoAvailableTiles() && !this.isPuzzleSolved(),
  );


  protected readonly boardStyles = computed(() => ({
    width: `${getBoardWidthPx()}px`,
    height: `${String(TILE_HEIGHT.NUMBER * 10)}px`,
    overflow: 'hidden',
  }));

  protected continue(): void {
    this.gameLogic.handleNextStep();
  }

  protected checkCards(): void {
    this.gameLogic.validatePlacedStatus();
  }

  protected autocompleteSentenceSolving(): void {
    this.gameLogic.autocompleteResult();
  }

  protected moveCardToAvailable(index: number): void {
    this.gameLogic.moveCardToAvailable(index);
  }

  protected moveCardToPlaced(index: number): void {
    this.gameLogic.moveCardToPlaced(index);
  }
}
