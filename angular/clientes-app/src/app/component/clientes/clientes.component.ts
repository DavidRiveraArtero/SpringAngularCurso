import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interface/cliente/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';   // formatDate(cliente.createAt, 'dd-MM-yyyy') para modificar como se ve la fecha

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  page:number = 0
  constructor(
    private clienteService:ClienteService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activateRouter.paramMap.subscribe( params => {

      this.page = +!params.get('page')

      if(!this.page){
        console.log("dentro")
        this.page = 0
      }

      this.clienteService.getClientes(this.page)
        .subscribe(valor => {
          this.clientes = valor.content
        console.log("NgOnit",valor)
      });
    })

  }


  eliminarC(cliente:Cliente){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `Seguro que quieres eliminar al cliente ${cliente.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteClient(cliente.id).subscribe(
          () => {
            // ACTUALIZAR LA LISTA DE CLIENTES
            this.clienteService.getClientes(this.page).subscribe(cliente => {
              this.clientes = cliente.content
            });

            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Tu cliente ha sido eliminado',
              'success'
            )
          }
        )
      }
      {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Se ha cancelado',
          'error'
        )
      }
    })

  }

}
