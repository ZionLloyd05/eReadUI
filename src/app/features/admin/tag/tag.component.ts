import { NotifyService } from './../../../shared/services/notify.service';
import { TagBoxComponent } from './tag-box/tag-box.component';
import { catchError, map } from 'rxjs/operators';
import { TagService } from './../_services/tag.service';
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { of, Observable } from 'rxjs';

import * as fromTag from './_state/reducers';
import * as tagActions from './_state/actions';
import { Store } from '@ngrx/store';
import { Tag } from '../_models/ITag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})

@Injectable()
export class TagComponent implements OnInit {

  constructor(
    private service: TagService,
    private dialog: MatDialog,
    private notify: NotifyService,
    private store: Store<fromTag.AppState>
    ) { }

  tagList: MatTableDataSource<any>;
  tags = [];
  displayedColumns: string[] = ['s/n', 'name', 'description', 'actions'];
  searchKey: string;
  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  // count = 1;
  ngOnInit() {
    this.store.dispatch(new tagActions.GetAll());
    this.store.subscribe(state => {
      this.tags = state.tags.tags;
      console.log(this.tags);
      let arr = [];
      arr = Object.values(this.tags);

      this.tagList = new MatTableDataSource(arr);
      this.tagList.sort = this.sort;
      this.tagList.paginator = this.paginator;
    });

  }

  applyFilter() {
    this.tagList.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
  }

  onCreate() {
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';

    const dialogRef = this.dialog.open(TagBoxComponent, dialogConfig);

    const sub = dialogRef.componentInstance.saveTag
      .subscribe(async (payload) => {
        console.log('perform a save now');
        console.log(payload);
        await this.saveTag(payload);

        // this.store.subscribe(state => {
        //   const tag = state.tags.tag;
        //   const data = this.tagList.data;
        //   data.push(tag);
        //   this.tagList.data = data;
        // });
      });
  }

  async saveTag(payload) {
    console.log('here');
    console.log(payload);
    const { tagPayload, formDt } = payload;
    if (tagPayload.id === 0) {
      // save tag
      await this.store.dispatch(new tagActions.Create(tagPayload));

    } else {
      // this.service.updateTag(tagPayload);
      console.log('update tag');
    }
    formDt.resetForm();
    this.service.tagForm.reset();
    this.service.initializeFormGroup();
    this.notify.success('Form Submitted Successfully');
  }

}
