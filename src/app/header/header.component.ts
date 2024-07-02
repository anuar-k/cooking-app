import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../shared/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly dataStoreService = inject(DataStorageService);
  private readonly recipeService = inject(RecipeService);
  private readonly authService = inject(AuthService);
  private subscription: Subscription;
  private subsRecipe: Subscription;
  isAuthenticated = false;
  isContainRecipes = false;

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  getRecipes() {
    this.subsRecipe = this.recipeService.updatedRecipe.subscribe(
      (recipes: Recipe[]) => {
        this.isContainRecipes = recipes.length > 0 ? true : false;
      }
    );
  }

  onSaveData() {
    this.dataStoreService.storeRecipes();
  }

  onLoadData() {
    this.dataStoreService.onfetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subsRecipe.unsubscribe();
  }
}
