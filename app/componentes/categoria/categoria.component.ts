import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriaModel } from '../../models/categoria';
import { CategoriaService } from '../../service/categoria.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  @Output() salida = new EventEmitter();
  categoria: CategoriaModel = new CategoriaModel();
  tabla: any = [];
  idCategoriaActualizar: string;

  constructor(private CategoriaService: CategoriaService) {}

  ngOnInit() {
    this.CategoriaService.obtenerCategorias()
      .then((data: any) => {
        this.tabla = data.categorias;
        console.log(this.tabla);
      })
      .catch((error) => {
        console.log('pues falló');
      });
  }

  registrar(forma: NgForm) {
    this.CategoriaService.registarCategoria(this.categoria)
      .then((categoria: any) => {
        Toast.fire(categoria.msg, '', 'success');
        forma.reset();
        this.salida.emit();
      })
      .catch((err: any) => {
        Toast.fire(err.console.error.msg, '', 'error');
      });
  }

  actualizar(actu: NgForm) {
    this.CategoriaService.actualizarCategoria(this.categoria.id, this.categoria)
      .then((categoria: any) => {
        Toast.fire(categoria.msg, '', 'success');
        actu.reset();
        this.salida.emit();
      })
      .catch((err: any) => {
        Toast.fire(err.console.error.msg, '', 'error');
      });
  }

  elimiar(idCategoria: string) {
    this.idCategoriaActualizar = idCategoria;
    console.log(idCategoria);
    this.CategoriaService.eliminarCategoria(idCategoria)
      .then((usuario: any) => {
        Toast.fire(usuario.msg, '', 'success');
        this.salida.emit();
      })
      .catch((err: any) => {
        Toast.fire(err.console.error.msg, '', 'error');
      });
  }
}
