import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductosModel } from '../models/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }
  url = `https://github.com/LuisDanielHerreraMendez/Proyecto-final-prueba2.git`;

  obtenerProductos(){
    return this.http.get(`${this.url}/productos`).toPromise();
  }

  registarProducto( usuario: ProductosModel) {
    return this.http.post(`${this.url}/productos`, usuario).toPromise();
  }

 actualizarProducto(id: string, usuario: ProductosModel) {
  return this.http.put(`${this.url}/productos/${id}`, usuario).toPromise();
 }

 eliminarProducto(id: string) {
  return this.http.delete(`${this.url}/productos/${id}`).toPromise();
 }

}
