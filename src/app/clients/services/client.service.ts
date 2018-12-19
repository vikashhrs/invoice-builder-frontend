import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client'

const BASR_URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this._http.get<Client[]>(`${BASR_URL}clients`);
  }

  createClient(client): Observable<Client> {
    return this._http.post<Client>(`${BASR_URL}clients`, client);
  }

  deleteClient(_id : string): Observable<Client> {
    return this._http.delete<Client>(`${BASR_URL}clients/${_id}`)
  }

  getClientById(_id: string) : Observable<Client>{
    return this._http.get<Client>(`${BASR_URL}clients/${_id}`)
  }

  updateClient(_id: string,client : Client) : Observable<Client>{
    return this._http.put<Client>(`${BASR_URL}clients/${_id}`, client);
  }

}
