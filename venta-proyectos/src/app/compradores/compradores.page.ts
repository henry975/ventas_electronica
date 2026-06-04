import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/database';
import { Comprador } from '../models/interfaces';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { listOutline, searchOutline, createOutline, trashOutline, saveOutline, closeOutline } from 'ionicons/icons';
import { UiButtonComponent } from '../components/ui-button/ui-button.component';
import { UiListComponent } from '../components/ui-list/ui-list.component';

// Componentes Propios Modulares
import { UiInputComponent } from '../components/ui-input/ui-input.component';
import { UiHeaderComponent } from '../components/ui-header/ui-header.component';

@Component({
  selector: 'app-compradores',
  templateUrl: './compradores.page.html',
  styleUrls: ['./compradores.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, UiInputComponent, UiHeaderComponent, UiListComponent, UiButtonComponent]
})
export class CompradoresPage implements OnInit, OnDestroy {
  comprador: Comprador = { nombres: '', apellidos: '', cedula: '', edad: null, domicilio: '' };
  
  listaCompradores: Comprador[] = [];
  listaFiltrada: Comprador[] = [];
  
  vistaDatos: boolean = false; 
  modoEdicion: boolean = false;
  idEdicion: string = '';
  terminoBusqueda: string = '';

  private sub: Subscription = new Subscription();

  constructor(
    private dbService: DatabaseService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ listOutline, searchOutline, createOutline, trashOutline, saveOutline, closeOutline });
  }

  ngOnInit() {
    this.cargarDatos();
  }

  ionViewWillLeave() {
    this.limpiarFormulario();
    this.vistaDatos = false;
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  cargarDatos() {
      this.sub = this.dbService.compradores$.subscribe((res: Comprador[]) => {
        this.listaCompradores = res;
        this.buscar(); 
      });
  }

  alternarVista() {
    this.vistaDatos = !this.vistaDatos;
    if (!this.vistaDatos && !this.modoEdicion) {
      this.limpiarFormulario();
    } else if (this.vistaDatos) {
      this.terminoBusqueda = ''; 
      this.listaFiltrada = [...this.listaCompradores];
    }
  }

  async guardar() {
    if (!this.comprador.nombres || !this.comprador.apellidos || !this.comprador.cedula || !this.comprador.edad || !this.comprador.domicilio) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No hay datos. Por favor, llene todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    try {
      if (this.modoEdicion) {
        await this.dbService.actualizarComprador(this.idEdicion, this.comprador);
        this.mostrarMensaje('Datos actualizados correctamente');
        this.cancelarEdicion();
      } else {
        await this.dbService.crearComprador(this.comprador);
        this.mostrarMensaje('Datos guardados correctamente');
        this.limpiarFormulario();
      }
    } catch (error) {
      this.mostrarMensaje('Ocurrió un error al guardar');
    }
  }

  prepararEdicion(item: Comprador) {
    this.modoEdicion = true;
    this.idEdicion = item.id!;
    this.comprador = { ...item };
    this.vistaDatos = false; 
  }

  cancelarEdicion() {
    this.limpiarFormulario();
    this.vistaDatos = true; 
  }

  async confirmarEliminacion(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿De verdad quieres eliminar este registro?',
      buttons: [
        { text: 'CANCELAR', role: 'cancel' },
        {
          text: 'ELIMINAR', role: 'destructive',
          handler: () => {
            this.dbService.eliminarComprador(id);
            this.mostrarMensaje('Registro eliminado');
          }
        }
      ]
    });
    await alert.present();
  }

  buscar() {
    const termino = this.terminoBusqueda ? this.terminoBusqueda.toLowerCase().trim() : '';
    if (termino === '') {
      this.listaFiltrada = [...this.listaCompradores];
      return;
    }
    
    this.listaFiltrada = this.listaCompradores.filter(c => 
      (c.nombres && c.nombres.toLowerCase().includes(termino)) ||
      (c.apellidos && c.apellidos.toLowerCase().includes(termino)) ||
      (c.cedula && c.cedula.toLowerCase().includes(termino))
    );
  }

  limpiarFormulario() {
    this.comprador = { nombres: '', apellidos: '', cedula: '', edad: null, domicilio: '' };
    this.modoEdicion = false;
    this.idEdicion = '';
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({ message: mensaje, duration: 2000, position: 'bottom', color: 'success' });
    await toast.present();
  }
}