import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Comprador, Vendedor } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private compradoresSub = new BehaviorSubject<Comprador[]>([]);
  public compradores$ = this.compradoresSub.asObservable();

  private vendedoresSub = new BehaviorSubject<Vendedor[]>([]);
  public vendedores$ = this.vendedoresSub.asObservable();

  constructor(private firestore: Firestore) {
    onSnapshot(collection(this.firestore, 'compradores'), (snapshot) => {
      const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comprador));
      this.compradoresSub.next(datos); // Actualiza la app al instante
    });

    onSnapshot(collection(this.firestore, 'vendedores'), (snapshot) => {
      const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Vendedor));
      this.vendedoresSub.next(datos); // Actualiza la app al instante
    });
  }

  // ==========================================
  // MÉTODOS PARA COMPRADORES
  // ==========================================
  crearComprador(comprador: Comprador) {
    return addDoc(collection(this.firestore, 'compradores'), comprador);
  }

  actualizarComprador(id: string, datos: any) {
    return updateDoc(doc(this.firestore, `compradores/${id}`), datos);
  }

  eliminarComprador(id: string) {
    return deleteDoc(doc(this.firestore, `compradores/${id}`));
  }

  // ==========================================
  // MÉTODOS PARA VENDEDORES
  // ==========================================
  crearVendedor(vendedor: Vendedor) {
    return addDoc(collection(this.firestore, 'vendedores'), vendedor);
  }

  actualizarVendedor(id: string, datos: any) {
    return updateDoc(doc(this.firestore, `vendedores/${id}`), datos);
  }

  eliminarVendedor(id: string) {
    return deleteDoc(doc(this.firestore, `vendedores/${id}`));
  }
}