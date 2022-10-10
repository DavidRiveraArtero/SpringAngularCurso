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
  // LA FORMA DE UPDATE y CREATE SON IGUAL DE VALIDAS
  public crear(){

    this.clienteService.postCliente(this.cliente).subscribe(
      cliente => {

        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo Cliente',
                  `El cliente fue creado con exito!!! ${cliente.nombre}`,
                  'success')
      }
    )
  }

  public update():void{
    this.clienteService.updateClient(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        let hola = Swal.fire('Cliente Actualizado',
                   `${json.mensaje} ${json.cliente.nombre}`,
                   'success');

        console.log(hola)
      }
    )
  }



}
