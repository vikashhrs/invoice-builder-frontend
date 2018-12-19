import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { remove } from 'lodash';
import { merge } from 'rxjs';
import { startWith, switchMap, catchError, map, mergeMap, flatMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { Client } from '../../models/client';
import { ClientCreateDialogComponent } from '../client-create-dialog/client-create-dialog.component';

@Component({
  selector: 'app-clients-listing',
  templateUrl: './clients-listing.component.html',
  styleUrls: ['./clients-listing.component.scss']
})
export class ClientsListingComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'action'];
  dataSource = new MatTableDataSource<Client>();
  resultsLength: number = 0;
  isResultsLoading: boolean = true;

  animal: string;
  name: string;

  constructor(private _clientService: ClientService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.isResultsLoading = true;
    this._clientService.getClients()
      .subscribe(data => {
        this.dataSource.data = data;
        this.isResultsLoading = false;
        this.showSnackBar('Fetched all clients!')
      }, error => {
        this.showSnackBar('Failed to fetch clients!', error);
      })
  }

  showSnackBar(message, error: any = null) {
    this._snackBar.open(message, error ? 'Error' : 'Success', {
      duration: 2000,
    });
  }

  openDialog(client : Client): void {
    const dialogRef = this.dialog.open(ClientCreateDialogComponent, {
      width: '400px',
      height: '400px',
      data: client ? client : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && !client){
        this.createClient(result);
      }else if(client){
        this.updateClient(client._id, result);
      }
    });
  }

  updateClient(_id: string, client: Client) {
    this._clientService.updateClient(_id, client)
    .subscribe(data => {
      const index = this.dataSource.data.findIndex(client => client._id === data._id);
      this.dataSource.data[index] = data;
      this.dataSource.data = [...this.dataSource.data];
      this.showSnackBar('Client Updated!');
    }, error => {
      this.showSnackBar('Failed to update client!', error);
    })
  }

  createClient(client){
    this._clientService.createClient(client)
    .subscribe(data => {
      this.dataSource.data[this.dataSource.data.length] = data;
      this.dataSource.data = [...this.dataSource.data];
      this.showSnackBar('Cleint Created!')
    },error => {
      this.showSnackBar('Failed to create client!', error);
    })
  }

  deleteClient(_id){
    this._clientService.deleteClient(_id)
    .subscribe(data => {
      const removedItems = remove(this.dataSource.data, (item) => {
        return item._id == data._id
      })
      this.dataSource.data = [...this.dataSource.data];
      this.showSnackBar('Invoice Deleted!');
    }, error => {
      this.showSnackBar('Failed to delete client!', error)
    })
  }
}
