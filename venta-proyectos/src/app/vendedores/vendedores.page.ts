import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/database';
import { Vendedor } from '../models/interfaces';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { listOutline, searchOutline, createOutline, trashOutline, saveOutline, closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.page.html',
  styleUrls: ['./vendedores.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VendedoresPage implements OnInit, OnDestroy {
  vendedor: Vendedor = { nombres: '', apellidos: '', proyecto: '', precio: null, domicilio: '' };
  
  listaVendedores: Vendedor[] = [];
  listaFiltrada: Vendedor[] = [];
  
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
      this.sub = this.dbService.vendedores$.subscribe((res: Vendedor[]) => {
        this.listaVendedores = res;
        this.buscar();
      });
    }
  alternarVista() {
        this.vistaDatos = !this.vistaDatos;
        if (!this.vistaDatos && !this.modoEdicion) {
          this.limpiarFormulario();
        } else if (this.vistaDatos) {
          this.terminoBusqueda = ''; 
          this.listaFiltrada = [...this.listaVendedores];
        }
    }

  async guardar() {
    if (!this.vendedor.nombres || !this.vendedor.apellidos || !this.vendedor.proyecto || !this.vendedor.precio || !this.vendedor.domicilio) {
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
        await this.dbService.actualizarVendedor(this.idEdicion, this.vendedor);
        this.mostrarMensaje('Datos actualizados correctamente');
        this.cancelarEdicion();
      } else {
        await this.dbService.crearVendedor(this.vendedor);
        this.mostrarMensaje('Datos guardados correctamente');
        this.limpiarFormulario();
      }
    } catch (error) {
      this.mostrarMensaje('Ocurrió un error al guardar');
    }
  }

  prepararEdicion(item: Vendedor) {
    this.modoEdicion = true;
    this.idEdicion = item.id!;
    this.vendedor = { ...item };
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
            this.dbService.eliminarVendedor(id);
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
          this.listaFiltrada = [...this.listaVendedores];
          return;
        }
        
        this.listaFiltrada = this.listaVendedores.filter(v => 
          (v.nombres && v.nombres.toLowerCase().includes(termino)) ||
          (v.apellidos && v.apellidos.toLowerCase().includes(termino)) ||
          (v.proyecto && v.proyecto.toLowerCase().includes(termino))
        );
    }

  limpiarFormulario() {
    this.vendedor = { nombres: '', apellidos: '', proyecto: '', precio: null, domicilio: '' };
    this.modoEdicion = false;
    this.idEdicion = '';
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje, duration: 2000, position: 'bottom', color: 'success'
    });
    await toast.present();
  }
}