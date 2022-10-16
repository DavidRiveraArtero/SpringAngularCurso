import { Injectable } from '@angular/core';
import { Cliente } from '../interface/cliente/cliente';
import { Observable, map, catchError,throwError, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private url:string = "http://localhost:8080/api/clientes"
  private httpHeader = new HttpHeaders({'Content-Type':'application/json'})
  public get = this.httpClient.get<Cliente>(this.url)

  constructor(private httpClient: HttpClient,
              private router:Router) { }

  // RECOGER LOS CLIENTES
  getClientes(page:number): Observable<any>{ // Observable = CUANDO HAYA UN CAMBIO EN EL BACK END LOS DATOS EN EL FRONT END SE MODIFICAN AUTOMATICAMENTE


    return this.httpClient.get(this.url + '/page/' + page ).pipe(
      tap( (response:any) => {
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente)
        })
      }),
      map((response:any) => {

        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente
        })
        return response
      })
    );

  }

  // CREAR EL CLIENTE
  postCliente(cliente: Cliente):Observable<Cliente>{

    return this.httpClient.post(this.url,cliente,{headers:this.httpHeader}).pipe(
      map((response:any) => response.cliente as Cliente),
      catchError(e => {
        console.log(e.status)
        if(e.status == 400){
          return throwError(e)
        }

        Swal.fire("Error al crear el cliente", e.error.mensaje,'error');
        return throwError(e)
      })
    )

  }

  // GET ONE CLIENT
  getCliente(id:number): Observable<Cliente>{

    return this.httpClient.get<Cliente>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])
        Swal.fire("Error al editar", e.error.mensaje, 'error');
        return throwError(e);
      })
    )

  }

  // UPDATE A CLIENT
  updateClient(client:Cliente): Observable<any>{

    return this.httpClient.put<any>(`${this.url}/${client.id}`, client, {headers: this.httpHeader}).pipe(
      catchError(e => {

        if(e.status == 400){
          console.log("hola",e)
          return throwError(e)
        }

        Swal.fire("Error al actualizar", e.error.mensaje,'error')
        return throwError(e)
      })
    );

  }

  deleteClient(id:number): Observable<Cliente>{
    return this.httpClient.delete<Cliente>(`${this.url}/${id}`).pipe(
      catchError(e => {
        Swal.fire("Error al eliminar el cliente", e.error.mensaje,'error') // EN EL CATCH ERROR RECOGEMOS EL ERROR QUE NOS DA LA BASE DE DATOS
        return throwError(e)
      })
    );
  }


}
