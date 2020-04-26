import { Component, OnInit, ViewChild, Injectable } from '@angular/core';

import { NotifyService } from './../../../shared/services/notify.service';
import { CategoryBoxComponent } from './category-box/category-box.component';
import { catchError, map } from 'rxjs/operators';
import { CategoryService } from './../_services/category.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { MatDialog } from '@angular/material';
import { of, Observable } from 'rxjs';

import { AppState } from './../index.reducer';
import * as categoryActions from './_state/actions';
import { Store } from '@ngrx/store';
import { Category } from '../_models/ICategory';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(
    private service: CategoryService,
    private dialog: MatDialog,
    private notify: NotifyService,
    private store: Store<AppState>
  ) { }

  categoryList: MatTableDataSource<any>;
  categorys = [];
  displayedColumns: string[] = ['s/n', 'name', 'slug', 'description', 'actions'];
  searchKey: string;

  categoryState;
  dialogConfig =  new MatDialogConfig();
  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  ngOnInit() {
  }

}
