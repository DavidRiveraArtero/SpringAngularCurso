import { Injectable } from '@angular/core';
import { CLIENTES } from '../component/clientes/clientes.json';
import { Cliente } from '../interface/cliente/cliente';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private url:string = "http://localhost:8080/api/clientes"
  private httpHeader = new HttpHeaders({'Content-Type':'application/json'})
  public get = this.httpClient.get<Cliente>(this.url)

  constructor(private httpClient: HttpClient) { }

  // RECOGER LOS CLIENTES
  getClientes(): Observable<Cliente[]>{ // Observable = CUANDO HAYA UN CAMBIO EN EL BACK END LOS DATOS EN EL FRONT END SE MODIFICAN AUTOMATICAMENTE
    this.get.subscribe()

    return this.httpClient.get<Cliente[]>(this.url);

  }

  // CREAR EL CLIENTE
  postCliente(cliente: Cliente):Observable<Cliente>{

    return this.httpClient.post<Cliente>(this.url,cliente,{headers:this.httpHeader})

  }

  // GET ONE CLIENT
  getCliente(id:number): Observable<Cliente>{

    return this.httpClient.get<Cliente>(`${this.url}/${id}`)

  }

  // UPDATE A CLIENT
  updateClient(client:Cliente): Observable<Cliente>{

    return this.httpClient.put<Cliente>(`${this.url}/${client.id}`, client, {headers: this.httpHeader});

  }

  deleteClient(id:number): Observable<Cliente>{
    return this.httpClient.delete<Cliente>(`${this.url}/${id}`);
  }


}
