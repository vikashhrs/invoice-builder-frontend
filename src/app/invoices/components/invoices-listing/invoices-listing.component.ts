import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { remove } from 'lodash';

@Component({
  selector: 'app-invoices-listing',
  templateUrl: './invoices-listing.component.html',
  styleUrls: ['./invoices-listing.component.scss']
})
export class InvoicesListingComponent implements OnInit {

  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'tax', 'rate', 'action'];
  dataSource: Invoice[] = [];
  constructor(private _invoiceService: InvoiceService, private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit() {
    this._invoiceService.getInvoices()
      .subscribe(data => {
        this.dataSource = data;
      }, error => this.showSnackBar('Failed to fetch invoces!', error));
  }

  createNewInvoice() {
    this._router.navigate(['dashboard', 'invoices', 'new'])
  }

  deleteInvoice(_id) {
    this._invoiceService.deleteInvoice(_id)
      .subscribe((data) => {
        const removedItems = remove(this.dataSource, (item) => {
          return item._id == data._id
        })
        this.dataSource = [...this.dataSource];
        this.showSnackBar('Invoice Deleted!');
      }, (error) => {
        this.showSnackBar('Failed to delete invoce!', error);
      })
  }

  editInvoice(_id){
    this._router.navigate(['dashboard','invoices',_id])
  }

  showSnackBar(message, error: any = null) {
    this._snackBar.open(message, error ? 'Error' : 'Success', {
      duration: 2000,
    });
  }

}
