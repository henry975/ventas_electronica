import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline, closeOutline, createOutline, trashOutline, searchOutline, listOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon]
})
export class UiButtonComponent {
  @Input() texto: string = '';
  @Input() color: string = 'primary';
  @Input() expand: string = ''; // 'block' para ancho completo
  @Input() fill: string = 'solid'; // 'solid', 'clear', 'outline'
  @Input() iconName: string = '';
  
  @Output() accion = new EventEmitter<void>();

  constructor() {
    addIcons({ saveOutline, closeOutline, createOutline, trashOutline, searchOutline, listOutline });
  }

  emitirClick() {
    this.accion.emit();
  }
}