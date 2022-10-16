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
  private errors:string[] = [];

  public errNombre:string = ""
  public errApellido:string = ""
  public errEmail:string = ""

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

    this.clienteService.postCliente(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo Cliente',
                  `El cliente fue creado con exito!!! ${cliente.nombre}`,
                  'success')
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error("Codigo del estado " + err.status)
        console.error(err.error.errors)

        for(var x = 0; x<err.error.errors.length;x++){
          if(err.error.errors[x].includes('nombre')){

            this.errNombre = err.error.errors[x]

          }

          if(err.error.errors[x].includes('apellido')){
            this.errApellido = err.error.errors[x]
          }

          if(err.error.errors[x].includes('email')){
            this.errEmail = err.error.errors[x]
          }

        }

      }
    )



  }

  public update():void{

    this.clienteService.updateClient(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        Swal.fire('Cliente Actualizado',
                  `${json.mensaje} ${json.cliente.nombre}`,
                  'success');
      },
      err => {
        console.log(err.error.errors)
        this.errors = err.error.errors as string[];
        console.error("Codigo del estado " + err.status)
        console.error(err.error.errors)

        for(var x = 0; x<err.error.errors.length;x++){
          if(err.error.errors[x].field.includes('nombre')){

            this.errNombre = err.error.errors[x].defaultMessage

          }

          if(err.error.errors[x].field.includes('apellido')){
            this.errApellido = err.error.errors[x].defaultMessage
          }

          if(err.error.errors[x].field.includes('email')){
            this.errEmail = err.error.errors[x].defaultMessage
          }

        }
      }
    )

  }

  // VALIDACIONES DEL FORM
  validNombre(){
    this.errNombre = "Campo Obligatorio"
    return !this.miFormulario.controls['name'].valid && (this.miFormulario.controls['name'].touched || this.miFormulario.controls['name'].dirty )

  }

  resetNombreError(){
    this.errNombre = ""
  }
  resetApellidoError(){
    this.errApellido = ""
  }
  resetEmailError(){
    this.errEmail = ""
  }
}
