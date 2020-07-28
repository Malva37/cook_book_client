import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipe } from "../interfaces/recipe.interfaces";
import { Recipe } from "../classes/recipe.model";

const baseUrl: string = "http://localhost:8080";


@Injectable({
  providedIn: 'root'
})

export class RecipesService {
  formData: Recipe;

  constructor(private http: HttpClient) { }

  getAll(id?) {
    return this.http.get(baseUrl + '/parentId?parentId=' +id);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }
  
  update(data){
    return this.http.put(`${baseUrl}`,data);
  }


}
