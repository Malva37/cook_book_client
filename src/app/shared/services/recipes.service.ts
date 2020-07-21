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

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl, data)
  }
  
  update(id,data){
    return this.http.put(`${baseUrl}/${id}`,data);
  }


}
