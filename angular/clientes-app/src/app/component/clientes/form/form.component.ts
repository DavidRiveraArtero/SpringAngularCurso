import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interface/cliente/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private activateRouter:ActivatedRoute,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  miFormulario: FormGroup = this.fb.group({
    'name':[this.cliente.nombre,[Validators.required],],
    'apellido':[this.cliente.apellido,[Validators.required],],
    'email':[,[Validators.required,Validators.email],]
  })


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

    this.cliente.nombre = this.miFormulario?.controls['name'].value
    this.cliente.apellido = this.miFormulario?.controls['apellido'].value
    this.cliente.email = this.miFormulario?.controls['email'].value


    if(this.miFormulario.valid == true){
      this.clienteService.postCliente(this.cliente).subscribe(
        cliente => {

          this.router.navigate(['/clientes'])
          Swal.fire('Nuevo Cliente',
                    `El cliente fue creado con exito!!! ${cliente.nombre}`,
                    'success')
        }
      )
    }else{
      Swal.fire('Informacion Invalida',
      `Algunos campos son incorrectos`,
      'error');
    }

  }

  public update():void{
    if(this.miFormulario.valid == true){
      this.clienteService.updateClient(this.cliente).subscribe(
        json => {
          this.router.navigate(['/clientes']);
          let hola = Swal.fire('Cliente Actualizado',
                    `${json.mensaje} ${json.cliente.nombre}`,
                    'success');

          console.log(hola)
        }
      )
    }else{
      Swal.fire('Informacion Invalida',
                   `Algunos campos son incorrectos`,
                   'error');
    }
  }

  // VALIDACIONES DEL FORM
  validNombre(){
    return !this.miFormulario.controls['name'].valid && (this.miFormulario.controls['name'].touched || this.miFormulario.controls['name'].dirty )
  }


}
