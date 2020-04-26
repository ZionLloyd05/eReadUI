import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../_models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = `${environment.apiHost}/api/category`;

  constructor(private http: HttpClient) { }

  categoryForm: FormGroup = new FormGroup ({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.categoryForm.setValue({
      id: 0,
      name: '',
      description: ''
    });
  }
  getCategoriess() {
    return this.http.get(this.baseUrl);
  }

  createCategory(payload: Category) {
    return this.http.post(this.baseUrl, payload);
  }

  updateCategory(payload: Category) {
    return this.http.put(`${this.baseUrl}/${payload.id}`, payload);
  }

  deleteCategory(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  populateForm(payload: Category) {
    this.categoryForm.setValue(payload);
  }

}
