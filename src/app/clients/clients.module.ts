import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsListingComponent } from './components/clients-listing/clients-listing.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ClientsListingComponent],
  exports: [ClientsListingComponent]
})
export class ClientsModule { }
