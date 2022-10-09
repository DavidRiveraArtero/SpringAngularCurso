import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form/form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    DirectivaComponent,
    ClientesComponent,
    FormComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule

  ],
  exports:[
    DirectivaComponent,
    ClientesComponent,
  ]
})
export class ComponentModule { }
