import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interface/cliente/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private clienteService:ClienteService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes()
    .subscribe(valor => {
       this.clientes = valor
    });
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
            this.clienteService.getClientes().subscribe(cliente => {
              this.clientes = cliente
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
