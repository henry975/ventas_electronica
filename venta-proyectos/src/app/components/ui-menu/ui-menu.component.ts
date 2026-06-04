import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { peopleOutline, hardwareChipOutline, homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ui-menu',
  templateUrl: './ui-menu.component.html',
  styleUrls: ['./ui-menu.component.scss'],
  standalone: true,
  imports: [IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle, RouterLink]
})
export class UiMenuComponent {
  constructor() {
    addIcons({ homeOutline, peopleOutline, hardwareChipOutline });
  }
}