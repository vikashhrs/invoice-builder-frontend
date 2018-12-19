import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatToolbar, MatToolbarModule, MatListModule, MatCardModule, MatTableModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatSortModule, MatDialogModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

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
  MatSnackBarModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatDialogModule,
  FormsModule,
  MatSelectModule
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
