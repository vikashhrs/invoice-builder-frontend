import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InvoicesListingComponent } from '../invoices/components/invoices-listing/invoices-listing.component';
import { ClientsListingComponent } from '../clients/components/clients-listing/clients-listing.component';
import { InvoiceFormComponent } from '../invoices/components/invoice-form/invoice-form.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { EditInvoiceResolverService } from '../invoices/services/edit-invoice-resolver.service';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuardService],children: [
      { path: 'invoices', component: InvoicesListingComponent, canActivateChild: [AuthGuardService] },
      { path: 'clients', component: ClientsListingComponent, canActivateChild: [AuthGuardService] },
      { path: 'invoices/new', component: InvoiceFormComponent, canActivateChild: [AuthGuardService]},
      { path: 'invoices/:_id', component: InvoiceFormComponent, canActivateChild: [AuthGuardService], resolve: {
        invoice: EditInvoiceResolverService
      }},
      { path: '**', redirectTo: 'invoices' , canActivateChild: [AuthGuardService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
