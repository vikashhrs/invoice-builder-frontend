import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { remove } from 'lodash';
import { merge } from 'rxjs';
import { startWith, switchMap, catchError, map } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';

@Component({
  selector: 'app-invoices-listing',
  templateUrl: './invoices-listing.component.html',
  styleUrls: ['./invoices-listing.component.scss']
})
export class InvoicesListingComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'tax', 'rate', 'action'];
  dataSource = new MatTableDataSource<Invoice>();
  resultsLength: number = 0;
  isResultsLoading: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _invoiceService: InvoiceService, private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    merge(this.paginator.page, this.sort.sortChange)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isResultsLoading = true;
        return this._invoiceService.getInvoices(
          { page: this.paginator.pageIndex, perpage: this.paginator.pageSize, sortField: this.sort.active, sortDirection: this.sort.direction, filter: '' }
        )
      }),
      map(data => {
        this.isResultsLoading = false;
        this.resultsLength = data.total;
        return data.docs
      }),
      catchError(() => {
        this.isResultsLoading = false;
        this.showSnackBar('Failed to fetch invoices', 'Error');
        return observableOf([]);
      })
    )
    .subscribe(data=> {
      this.dataSource.data = data;
    }, error => this.showSnackBar('Failed to fetch invoices', error))
  }

  createNewInvoice() {
    this._router.navigate(['dashboard', 'invoices', 'new'])
  }

  deleteInvoice(_id) {
    this._invoiceService.deleteInvoice(_id)
      .subscribe((data) => {
        const removedItems = remove(this.dataSource.data, (item) => {
          return item._id == data._id
        })
        this.dataSource.data = [...this.dataSource.data];
        this.showSnackBar('Invoice Deleted!');
      }, (error) => {
        this.showSnackBar('Failed to delete invoce!', error);
      })
  }

  editInvoice(_id) {
    this._router.navigate(['dashboard', 'invoices', _id])
  }

  showSnackBar(message, error: any = null) {
    this._snackBar.open(message, error ? 'Error' : 'Success', {
      duration: 2000,
    });
  }

  filterText(filter: string){
    this.isResultsLoading = true;
    this.paginator.pageIndex = 0;
    filter = filter.trim();
    this._invoiceService.getInvoices(
      { page: this.paginator.pageIndex, perpage: this.paginator.pageSize, sortField: this.sort.active, sortDirection: this.sort.direction , filter})
      .subscribe(data => {
        this.isResultsLoading = false;
        this.dataSource.data = data.docs;
        this.resultsLength = data.total;
      })
  }

}
