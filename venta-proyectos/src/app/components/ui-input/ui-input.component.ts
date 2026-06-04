import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonItem, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonItem, IonInput]
})
export class UiInputComponent {
  // Recibe la configuración desde la página principal
  @Input() label: string = '';
  @Input() type: 'text' | 'number' | 'email' = 'text';
  
  // Recibe el dato a mostrar
  @Input() valor: any = ''; 
  
  // Emite el dato actualizado cuando el usuario escribe
  @Output() valorChange = new EventEmitter<any>();

  // Función que detecta cada tecla presionada y la envía de vuelta
  cambioDeValor(nuevoValor: any) {
    this.valor = nuevoValor;
    this.valorChange.emit(this.valor);
  }
}