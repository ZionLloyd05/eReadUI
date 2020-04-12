import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { TagComponent } from '../admin/tag/tag.component';
import { CategoryComponent } from '../admin/category/category.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTabsModule, MatCardModule, MatGridListModule, MatToolbarModule } from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import { TagBoxComponent } from './tag/tag-box/tag-box.component';


const adminRoutes: Routes = [
  { path: '', component: DashboardComponent }
]

@NgModule({
  declarations: [
    DashboardComponent,
    TagComponent,
    CategoryComponent,
    TagBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatToolbarModule
  ],
  providers: [DatePipe]
})
export class AdminModule { }