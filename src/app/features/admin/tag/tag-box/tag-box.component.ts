import { TagService } from './../../_services/tag.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Tag } from '../../_models/ITag';
import * as fromTag from '../_state/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tag-box',
  templateUrl: './tag-box.component.html',
  styleUrls: ['./tag-box.component.css']
})
export class TagBoxComponent implements OnInit {

  tagForm: FormGroup;
  isLoading = false;
  @Output() saveTag = new EventEmitter();
  constructor(
    public service: TagService,
    public dialogRef: MatDialogRef<TagBoxComponent>,
    private store: Store<fromTag.AppState>
  ) { }

  ngOnInit() {
    this.store.select(fromTag.getTagsLoading)
      .subscribe(isLoading => this.isLoading = isLoading);
  }

  onClear() {
    this.service.tagForm.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.service.tagForm.valid) {
      const tagPayload: Tag = {
        id: this.service.tagForm.get('id').value,
        name: this.service.tagForm.get('name').value,
        description: this.service.tagForm.get('description').value
      };

      const payload: any = {
        tagPayload,
        formDt: formDirective
      };

      this.saveTag.emit(payload);
    }
  }
}
