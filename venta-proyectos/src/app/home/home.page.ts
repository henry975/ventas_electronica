import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UiHeaderComponent } from '../components/ui-header/ui-header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, UiHeaderComponent],
})
export class HomePage {
  constructor() {}
}