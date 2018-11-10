import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatToolbar, MatToolbarModule, MatListModule, MatCardModule, MatTableModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule } from '@angular/material';

const EXPORTED_MAT_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule
]

@NgModule({
  imports: [
    CommonModule,
    ...EXPORTED_MAT_MODULES
  ],
  exports: [
    ...EXPORTED_MAT_MODULES
  ],
  declarations: []
})
export class MaterialModule { }
