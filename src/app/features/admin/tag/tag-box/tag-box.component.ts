import { TagService } from './../../_services/tag.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Tag } from '../../_models/ITag';

@Component({
  selector: 'app-tag-box',
  templateUrl: './tag-box.component.html',
  styleUrls: ['./tag-box.component.css']
})
export class TagBoxComponent implements OnInit {

  tagForm: FormGroup;
  constructor(
    public tagService: TagService,
    public dialogRef: MatDialogRef<TagBoxComponent>,
    // private notify: NotifyService
  ) { }

  ngOnInit() {

  }

  onClear() {
    this.tagService.tagForm.reset();
    this.tagService.initializeFormGroup();
    this.dialogRef.close();
  }

  onSubmit() {
    // if (this.tagService.tagForm.valid) {
    //   const tagPayload: Tag = {
    //     id: this.tagService.tagForm.get('id').value,
    //     name: this.tagService.tagForm.get('name').value,
    //     description: this.tagService.tagForm.get('description').value
    //   };

    //   if (this.tagService.tagForm.get('id').value === 0) {
    //     // save tag
    //   } else {
    //     this.tagService.updateTag(tagPayload);
    //   }
    //   this.tagService.tagForm.reset();
    //   this.tagService.initializeFormGroup();
    //   this.alertifyService.success('Form Submitted Successfully');
    //   this.onClear();
    // }
  }
}
