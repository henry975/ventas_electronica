import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ui-list',
  templateUrl: './ui-list.component.html',
  styleUrls: ['./ui-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon]
})
export class UiListComponent {
  // Recibe la lista filtrada de Firebase
  @Input() datos: any[] = [];
  // Identifica si debe mostrar el formato de comprador o de vendedor
  @Input() tipo: 'comprador' | 'vendedor' = 'comprador';

  // Emisores de eventos hacia la página padre
  @Output() accionEditar = new EventEmitter<any>();
  @Output() accionEliminar = new EventEmitter<string>();

  constructor() {
    addIcons({ createOutline, trashOutline });
  }

  editar(item: any) {
    this.accionEditar.emit(item);
  }

  eliminar(id: string) {
    this.accionEliminar.emit(id);
  }
}