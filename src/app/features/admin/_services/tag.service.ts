import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../_models/ITag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  baseUrl = `${environment.apiHost}/api/tags`;
  constructor(private http: HttpClient) { }

  tagForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.tagForm.setValue({
      id: 0,
      name: '',
      description: ''
    });
  }
  getTags() {
    return this.http.get(this.baseUrl);
  }

  createTag(payload: Tag) {
    return this.http.post(this.baseUrl, payload);
  }

  updateTag(payload: Tag) {
    return this.http.put(`${this.baseUrl}/${payload.id}`, payload);
  }

  populateForm(payload: Tag) {
    this.tagForm.setValue(payload);
    console.log(this.tagForm.value);
  }
}
