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
    // this.store.dispatch(new tagActions.GetAll());
    // this.store.subscribe(state => {
      // this.tags = state.tags.tags;
      // console.log(this.tags);
      // let arr = [];
      // arr = Object.values(this.tags);

      // this.tagList = new MatTableDataSource(arr);
      // this.tagList.sort = this.sort;
      // this.tagList.paginator = this.paginator;
    // });

    this.service.getTags()
      .subscribe(tags => {
        let arr = [];
        arr = Object.values(tags);

        this.tagList = new MatTableDataSource(arr);
        this.tagList.sort = this.sort;
        this.tagList.paginator = this.paginator;
      }, (err) => {
        this.tagList = new MatTableDataSource([]);
        this.notify.error(err);
      });
    // console.log(this.tagList);
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

    this.dialog.open(TagBoxComponent, dialogConfig);
  }

}
