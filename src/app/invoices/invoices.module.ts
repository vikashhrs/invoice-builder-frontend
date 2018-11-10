import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesListingComponent } from './components/invoices-listing/invoices-listing.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceService } from './services/invoice.service';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [InvoicesListingComponent, InvoiceFormComponent],
  providers: [InvoiceService],
  exports : [InvoicesListingComponent, InvoiceFormComponent]
})
export class InvoicesModule { }