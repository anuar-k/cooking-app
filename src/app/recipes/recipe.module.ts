import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeRouting } from './recipe-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [ReactiveFormsModule, RecipeRouting, SharedModule],
})
export class RecipeModule {}
