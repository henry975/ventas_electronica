import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { UiMenuComponent } from './components/ui-menu/ui-menu.component'; // Importamos nuestro componente

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, UiMenuComponent], // Lo inyectamos aquí
})
export class AppComponent {
  constructor() {}
}