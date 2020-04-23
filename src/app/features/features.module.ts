import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { tagReducer } from './admin/tag/_state/reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('tags', tagReducer)
  ]
})
export class FeaturesModule { }
