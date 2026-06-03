import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Comprador, Vendedor } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: Firestore) { }

  // ==========================================
  // MÉTODOS PARA COMPRADORES
  // ==========================================

  crearComprador(comprador: Comprador) {
    const compradoresRef = collection(this.firestore, 'compradores');
    return addDoc(compradoresRef, comprador);
  }

  obtenerCompradores(): Observable<Comprador[]> {
    const compradoresRef = collection(this.firestore, 'compradores');
    return collectionData(compradoresRef, { idField: 'id' }) as Observable<Comprador[]>;
  }

  actualizarComprador(id: string, datos: any) {
    const compradorDocRef = doc(this.firestore, `compradores/${id}`);
    return updateDoc(compradorDocRef, datos);
  }

  eliminarComprador(id: string) {
    const compradorDocRef = doc(this.firestore, `compradores/${id}`);
    return deleteDoc(compradorDocRef);
  }

  // ==========================================
  // MÉTODOS PARA VENDEDORES
  // ==========================================

  crearVendedor(vendedor: Vendedor) {
    const vendedoresRef = collection(this.firestore, 'vendedores');
    return addDoc(vendedoresRef, vendedor);
  }

  obtenerVendedores(): Observable<Vendedor[]> {
    const vendedoresRef = collection(this.firestore, 'vendedores');
    return collectionData(vendedoresRef, { idField: 'id' }) as Observable<Vendedor[]>;
  }

  actualizarVendedor(id: string, datos: any) {
    const vendedorDocRef = doc(this.firestore, `vendedores/${id}`);
    return updateDoc(vendedorDocRef, datos);
  }

  eliminarVendedor(id: string) {
    const vendedorDocRef = doc(this.firestore, `vendedores/${id}`);
    return deleteDoc(vendedorDocRef);
  }
}