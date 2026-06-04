import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ui-header',
  templateUrl: './ui-header.component.html',
  styleUrls: ['./ui-header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon]
})
export class UiHeaderComponent {
  @Input() titulo: string = '';
  @Input() colorTema: string = 'primary'; 
  @Input() mostrarBotonDatos: boolean = false;
  
  @Output() clickDatos = new EventEmitter<void>();

  accionBoton() {
    this.clickDatos.emit();
  }
}