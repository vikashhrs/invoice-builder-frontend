import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice'

const BASR_URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private _http: HttpClient) { }

  getInvoices(): Observable<Invoice[]> {
    return this._http.get<Invoice[]>(`${BASR_URL}invoices`);
  }

  createInvoice(invoice): Observable<Invoice> {
    return this._http.post<Invoice>(`${BASR_URL}invoices`, invoice);
  }

  deleteInvoice(_id : string): Observable<Invoice> {
    return this._http.delete<Invoice>(`${BASR_URL}invoices/${_id}`)
  }

  getInvoiceById(_id: string) : Observable<Invoice>{
    return this._http.get<Invoice>(`${BASR_URL}invoices/${_id}`)
  }

  updateInvoice(_id: string,invoice : Invoice) : Observable<Invoice>{
    return this._http.put<Invoice>(`${BASR_URL}invoices/${_id}`, invoice);
  }

}
