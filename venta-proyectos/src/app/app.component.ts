import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { peopleOutline, hardwareChipOutline, homeOutline } from 'ionicons/icons'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle, RouterLink],
})
export class AppComponent {
  constructor() {
    addIcons({ homeOutline, peopleOutline, hardwareChipOutline });
  }
}