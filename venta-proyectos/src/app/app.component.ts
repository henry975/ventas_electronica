import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { peopleOutline, hardwareChipOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  // ¡Aquí estaba el detalle! Añadí RouterLink al final de esta lista:
  imports: [IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle, RouterLink],
})
export class AppComponent {
  constructor() {
    // Registro los íconos a utilizar en el menú
    addIcons({ peopleOutline, hardwareChipOutline });
  }
}