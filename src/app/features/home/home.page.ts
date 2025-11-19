import {Component, inject, viewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton, IonCard, IonCardContent,
  IonContent,
  IonFooter,
  IonHeader, IonItem,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Api} from "../../core/api/api";
import {Router} from "@angular/router";
import {from} from "rxjs";
import {CapacitorHttp} from "@capacitor/core";
import {Levels} from "../../core/api/api-models";
import {Http} from "@capacitor-community/http";
import {SettingsComponent} from "../settings/settings.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonModal, IonFooter, IonList, IonItem, IonCard, IonCardContent, SettingsComponent]
})
export class HomePage {
  private readonly router = inject(Router);
  private readonly modal = viewChild(IonModal)

  public closeModal() {
    this.modal()?.dismiss(null, 'cancel')
  }

  public navigateToPuzzle(): void {
    void this.router.navigate(['/levels']);
  }

  protected readonly close = close;
}
