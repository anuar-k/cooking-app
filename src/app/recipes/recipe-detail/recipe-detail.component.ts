import {Component, inject, Input, OnInit} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private recipeService = inject(RecipeService)
  recipe: Recipe

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipeById(+params['id'])
    })
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.recipeService.addToShoppingList(ingredients)
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
}
