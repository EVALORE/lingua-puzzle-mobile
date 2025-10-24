import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {HttpData} from "../../core/api/http-data";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class HomePage {
  private readonly http = inject(HttpData);
  private readonly router = inject(Router);

  constructor() {

  }

  public navigateToPuzzle(): void {
    void this.router.navigate(['/puzzle']);
  }

}
