import { Recipe } from '../shared/recipe.model';
import { inject, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeService {
  private shoppingListService = inject(ShoppingListService);
  private baseUrl =
    'https://recipe-book-cc9f3-default-rtdb.firebaseio.com/recipes.json';
  public updatedRecipe = new BehaviorSubject<Recipe[]>(null);

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.updatedRecipe.next(this.recipes.slice());
  }

  getRecipeById(recipeId: number): Recipe {
    return this.recipes.find((recipe, index) => index === recipeId);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.updatedRecipe.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.updatedRecipe.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.updatedRecipe.next(this.recipes.slice());
  }
}
