import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-box',
  templateUrl: './tag-box.component.html',
  styleUrls: ['./tag-box.component.css']
})
export class TagBoxComponent implements OnInit {

  tagForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.tagForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  onClear() {

  }
}
