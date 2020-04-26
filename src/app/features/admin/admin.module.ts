import { StoreModule } from '@ngrx/store';
import { TagEffect } from './tag/_state/effects';
import { EffectsModule } from '@ngrx/effects';
import { TagService } from './_services/tag.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { TagComponent } from '../admin/tag/tag.component';
import { CategoryComponent } from '../admin/category/category.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import {
  MatTabsModule,
  MatCardModule,
  MatGridListModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatDialogRef} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import { TagBoxComponent } from './tag/tag-box/tag-box.component';
import { reducer } from './index.reducer';
import { CategoryBoxComponent } from './category/category-box/category-box.component';


const adminRoutes: Routes = [
  { path: '', component: DashboardComponent }
]

@NgModule({
  declarations: [
    DashboardComponent,
    TagComponent,
    CategoryComponent,
    TagBoxComponent,
    CategoryBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    StoreModule.forFeature('admin', reducer),
    EffectsModule.forFeature([TagEffect]),
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [DatePipe, TagService ,
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  entryComponents: [TagBoxComponent]
})
export class AdminModule { }
