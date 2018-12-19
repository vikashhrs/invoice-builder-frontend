import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice, InvoicePaginationResponse } from '../models/invoice'

const BASR_URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private _http: HttpClient) { }

  getInvoices({page = 1, perpage = 10, sortField , sortDirection, filter}): Observable<InvoicePaginationResponse> {
    return this._http.get<InvoicePaginationResponse>(`${BASR_URL}invoices/?page=${page + 1}&perpage=${perpage}&sortField=${sortField}&sortDirection=${sortDirection}&filter=${filter}`);
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
