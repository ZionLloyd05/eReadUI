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
  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.baseUrl);
  }

  createTag(payload: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.baseUrl, payload);
  }

  updateTag(payload: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.baseUrl}/${payload.id}`, payload);
  }

  deleteTag(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  populateForm(payload: Tag) {
    this.tagForm.setValue(payload);
  }
}
