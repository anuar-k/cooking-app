import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private http = inject(HttpClient);
  private recipeService = inject(RecipeService);

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    if(recipes.length === 0) return;
    this.http
      .put(
        'https://recipe-book-cc9f3-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe();
  }

  onfetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-book-cc9f3-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}