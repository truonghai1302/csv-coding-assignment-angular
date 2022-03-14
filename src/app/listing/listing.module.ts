import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { DialogOverviewExampleDialog, ListingComponent } from './listing.component';
import { BackendService } from 'src/app/backend.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

const MatModules = [
  MatButtonModule,
  MatCardModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule
]

@NgModule({
  declarations: [
    ListingComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    CommonModule,
    ListingRoutingModule,    
    FormsModule,
    ...MatModules,
  ],
  providers: []
})
export class ListingModule { }
