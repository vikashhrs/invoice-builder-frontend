import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-create-dialog',
  templateUrl: './client-create-dialog.component.html',
  styleUrls: ['./client-create-dialog.component.scss']
})
export class ClientCreateDialogComponent implements OnInit {

  clientForm: FormGroup;
  client: Client;

  dialogTitle : string = 'New Client';
  
  ngOnInit(): void {
    this.createForm();
    if(this.data){
      this.dialogTitle = 'Update Client';
      this.clientForm.patchValue(this.data);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<ClientCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _formBuilder: FormBuilder) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.clientForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    })
  }
}
