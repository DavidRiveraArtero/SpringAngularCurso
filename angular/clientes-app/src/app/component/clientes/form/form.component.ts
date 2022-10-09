import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interface/cliente/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente()

  titulo:string = "Formulario";
  nombre:string = "";
  apellido:string = "";
  email:string = "";

  constructor(
    private clienteService:ClienteService,
    private router:Router,
    private activateRouter:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  public cargarCliente():void{
    this.activateRouter.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente
        })
      }
    })
  }

  public crear(){
    console.log("dentro")
    console.log(this.cliente)
    this.clienteService.postCliente(this.cliente).subscribe(
      cliente => {

        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo Cliente',
                  `Cliente ${this.cliente.nombre} creado con exito!`,
                  'success')
      }
    )
  }

  public update():void{
    this.clienteService.updateClient(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        let hola = Swal.fire('Cliente Actualizado',
                   `Cliente ${this.cliente.nombre} ha sido actualizado con exito`,
                   'success');

        console.log(hola)
      }
    )
  }



}
