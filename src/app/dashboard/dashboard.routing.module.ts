import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InvoicesListingComponent } from '../invoices/components/invoices-listing/invoices-listing.component';
import { ClientsListingComponent } from '../clients/components/clients-listing/clients-listing.component';
import { InvoiceFormComponent } from '../invoices/components/invoice-form/invoice-form.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'invoices', component: InvoicesListingComponent },
      { path: 'clients', component: ClientsListingComponent },
      { path: 'invoices/new', component: InvoiceFormComponent},
      { path: 'invoices/:_id', component: InvoiceFormComponent},
      { path: '**', redirectTo: 'invoices' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
