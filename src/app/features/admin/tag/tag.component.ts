import { NotifyService } from './../../../shared/services/notify.service';
import { TagBoxComponent } from './tag-box/tag-box.component';
import { catchError, map } from 'rxjs/operators';
import { TagService } from './../_services/tag.service';
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialogConfig,
} from '@angular/material';
import { MatDialog } from '@angular/material';
import { of, Observable } from 'rxjs';

import * as tagActions from './_state/actions';
import * as fromTag from './_state/reducers';
// import * as fromStore from '../index.reducer';
import { Store } from '@ngrx/store';
import { Tag } from '../_models/ITag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
@Injectable()
export class TagComponent implements OnInit {
  constructor(
    private service: TagService,
    private dialog: MatDialog,
    private notify: NotifyService,
    private store: Store<fromTag.AppState>
  ) {}

  tagList: MatTableDataSource<any>;
  tags = [];
  displayedColumns: string[] = ['s/n', 'name', 'description', 'actions'];
  searchKey: string;
  isLoaded = false;
  isLoading = false;
  tagState;
  dialogConfig = new MatDialogConfig();
  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  // count = 1;
  ngOnInit() {
    this.store.dispatch(new tagActions.GetAll());

    this.store.select(fromTag.getTags).subscribe((state) => {

      // console.log(entities);
      this.tags = state;
      let arr = [];
      arr = Object.values(this.tags);

      this.tagList = new MatTableDataSource(arr);
      this.tagList.sort = this.sort;
      this.tagList.paginator = this.paginator;

    });

    this.store.select(fromTag.getTagsLoading)
      .subscribe(isLoading => this.isLoading = isLoading);

    this.store.select(fromTag.getTagsLoaded)
      .subscribe(isLoaded => this.isLoaded = isLoaded);

    if (this.isLoaded && !this.isLoading) {
      this.notify.success('Tag operation was successful');
    }
  }

  applyFilter() {
    this.tagList.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
  }

  onCreate() {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = '60%';

    const dialogRef = this.dialog.open(TagBoxComponent, this.dialogConfig);

    const sub = dialogRef.componentInstance.saveTag.subscribe(
      async (payload) => {
        this.store.subscribe((state) => {
          dialogRef.componentInstance.isLoading = state.tags.isLoading;
        });
        await this.saveTag(payload);
      }
    );
  }

  async saveTag(payload) {
    const { tagPayload, formDt } = payload;
    if (tagPayload.id === 0) {
      // save tag
      await this.store.dispatch(new tagActions.Create(tagPayload));
      this.clearForm(formDt);
    } else {
      // this.service.updateTag(tagPayload);
      await this.store.dispatch(new tagActions.UpdateTag(tagPayload));
      this.clearForm(formDt);
    }
  }

  clearForm(formDt: any) {
    formDt.resetForm();
    this.service.tagForm.reset();
    this.service.initializeFormGroup();
  }

  onEdit(row) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = '60%';

    this.service.populateForm(row);
    const dialogRef = this.dialog.open(TagBoxComponent, this.dialogConfig);

    const sub = dialogRef.componentInstance.saveTag.subscribe(
      async (payload) => {
        await this.saveTag(payload);
      }
    );
  }
}
