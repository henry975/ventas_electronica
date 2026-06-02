export interface Comprador {
  id?: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  edad: number | null;
  domicilio: string;
}

export interface Vendedor {
  id?: string;
  nombres: string;
  apellidos: string;
  proyecto: string;
  precio: number | null;
  domicilio: string;
}