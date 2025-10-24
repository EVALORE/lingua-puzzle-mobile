import {Component, input, OnInit, output} from '@angular/core';
import {Tile} from "../types/tile";
import {TILE_HEIGHT} from "../consts/ui-layout";
import {IonCard} from "@ionic/angular/standalone";

interface CardStyles {
  width: string;
  height: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  backgroundRepeat?: string;
}

interface TileClassNames {
  solved?: boolean;
  wrong?: boolean;
  correct?: boolean;
}


@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss'],
  imports: [
    IonCard
  ]
})
export class TilesComponent {
  public readonly tiles = input.required<Tile[]>();
  public solved = input<boolean>();
  public readonly cardClick = output<number>();

  protected getTileStyles({width, xOffset, yOffset}: Tile): CardStyles {
    return {
      width: `${String(width)}px`,
      height: TILE_HEIGHT.PX,
    };
  }

  protected getTileClassNames(tile: Tile): TileClassNames {
    if (this.solved()) {
      return {solved: true};
    }

    return {
      wrong: tile.positionStatus === 'WRONG',
      correct: tile.positionStatus === 'CORRECT',
    };
  }

  protected onTileClick(index: number): void {
    this.cardClick.emit(index);
  }
}
