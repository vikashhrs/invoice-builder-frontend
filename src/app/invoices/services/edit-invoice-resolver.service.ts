import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InvoiceService } from './invoice.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditInvoiceResolverService implements Resolve<Invoice> {

  constructor(private _invoiceService: InvoiceService, private _router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Invoice> {
    let _id = route.paramMap.get('_id');
    return this._invoiceService.getInvoiceById(_id)
      .pipe(
        take(1),
        map(invoice => {
          if(invoice){
            return invoice;
          }else{
            this._router.navigate(['dashboard','invoices']);
            return null;
          }
        })
      )
  }
}
