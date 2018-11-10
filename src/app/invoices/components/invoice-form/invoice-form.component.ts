import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  invoiceForm: FormGroup;
  invoice: Invoice;

  constructor(private _formBuilder: FormBuilder, private _invoiceService: InvoiceService, private _snackBar: MatSnackBar, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    this.setInvoiceToForm();
  }

  setInvoiceToForm(){
    this._activatedRoute.params.subscribe(params => {
      let _id = params['_id'];
      if(_id){
        this._invoiceService.getInvoiceById(_id).subscribe(invoice => {
          this.invoice = invoice;
          this.showSnackBar('Invoice Loaded!');
          this.invoiceForm.patchValue(this.invoice);
        }, error => {
          this.showSnackBar('Failed to Load Invoice!', error)
        })
      }else{
        return;
      }
    })
  }

  createForm() {
    this.invoiceForm = this._formBuilder.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
      due: ['', Validators.required],
      qty: ['', Validators.required],
      rate: ['', Validators.pattern("^[0-9]*$")],
      tax: ['', Validators.pattern("^[0-9]*$")],
    })
  }

  showSnackBar(message, error: any = null){
    this._snackBar.open(message, error ? 'Error' : 'Success', {
      duration: 2000,
    });
  }

  onSubmit(){
    if(this.invoice){
      this._invoiceService.updateInvoice(this.invoice._id,this.invoiceForm.value)
      .subscribe(data => {
        this.showSnackBar('Invoice Updated!');
        this._router.navigate(['dashboard','invoices']);
      }, (error) => {
        this.showSnackBar('Failed to create invoice!', error)
      })
    }else{
      this._invoiceService.createInvoice(this.invoiceForm.value)
      .subscribe(data => {
        this.showSnackBar('Invoice Created!');
        this._router.navigate(['dashboard','invoices']);
      }, (error) => {
        this.showSnackBar('Failed to create invoice!', error)
      })
    }
  }

}
