import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { StatusBar} from '@capacitor/status-bar';
import {interval} from "rxjs";
import {Capacitor} from "@capacitor/core";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    const isNative = Capacitor.getPlatform() !== 'web';
    if (isNative && Capacitor.isPluginAvailable('StatusBar')) {
      interval(1000).subscribe(async () => {
        const info = await StatusBar.getInfo();
        if (info.visible) {
          await StatusBar.hide();
        }
      });
    }
  }
}
