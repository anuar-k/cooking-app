import { Recipe } from '../shared/recipe.model';
import { inject, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  private shoppingListService = inject(ShoppingListService);
  updatedRecipe = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Recipe 1',
      'Desc Recipe 1',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwg1XMePvfuJrrEwoE41o8ODWXkr34jD4Klg&s',
      [new Ingredient('Meat', 2), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://img.freepik.com/free-psd/fresh-beef-burger-isolated-transparent-background_191095-9018.jpg?size=626&ext=jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  getRecipeById(recipeId: number): Recipe {
    return this.recipes.find((recipe, index) => index === recipeId);
  }

  getRecipe() {
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

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.updatedRecipe.next(this.recipes.slice());
  }
}
