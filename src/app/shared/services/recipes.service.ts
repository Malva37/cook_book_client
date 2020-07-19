import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipe } from "../interfaces/recipe.interfaces";
import { Recipe } from "../classes/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private url: string;
  formData: Recipe;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:3000/recipes"
  }

  getJSONRecipes(): Observable<Array<IRecipe>> {
    return this.http.get<Array<IRecipe>>(this.url)
  }

  postJSONRecipes(recipe): Observable<Array<IRecipe>> {
    return this.http.post<Array<IRecipe>>(this.url, recipe)
  }

 

}
