import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './component/clientes/clientes.component';
import { DirectivaComponent } from './component/directiva/directiva.component';
import { FormComponent } from './component/clientes/form/form.component';


const routes:Routes = [

  {
    path:'clientes',
    component: ClientesComponent
  },
  {
    path:'directiva',
    component: DirectivaComponent
  },
  {
    path:'clientes/form',
    component: FormComponent
  },
  {
    path:'clientes/form/:id',
    component: FormComponent
  },
  {
    path:'**',
    redirectTo:'directiva'
  }
]


@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }


