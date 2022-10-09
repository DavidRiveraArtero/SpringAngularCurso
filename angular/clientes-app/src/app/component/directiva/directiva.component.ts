import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {

  listaCurso:string[] = ['TypeScript','JavaScript', 'Java', 'C#', 'PHP']
  ocultar:boolean = false
  txtBoton:string = "Ocultar"

  constructor() { }

  ngOnInit(): void {
  }

  cambiarEstado(){
    !this.ocultar ? this.ocultar=true : this.ocultar=false

    !this.ocultar ? this.txtBoton="Ocultar" : this.txtBoton="Mostrar"
  }

}
