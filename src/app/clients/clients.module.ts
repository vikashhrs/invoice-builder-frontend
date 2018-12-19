import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsListingComponent } from './components/clients-listing/clients-listing.component';
import { MaterialModule } from '../shared/material.module';
import { ClientService } from './services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { ClientCreateDialogComponent } from './components/client-create-dialog/client-create-dialog.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ClientsListingComponent, ClientCreateDialogComponent, FormDialogComponent],
  exports: [ClientsListingComponent],
  providers: [ClientService],
  entryComponents: [ClientCreateDialogComponent]
})
export class ClientsModule { }
