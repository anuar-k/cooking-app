import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private shoppingListService = inject(ShoppingListService);
  private subsciption: Subscription;
  private amounCounttValidator = this.amountValidator.bind(this);
  form: FormGroup;
  editMode = false;
  editedItemIndex: number;
  editedIngredient: Ingredient;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [
        Validators.required,
        this.amounCounttValidator,
      ]),
    });

    this.subsciption = this.shoppingListService.startedIditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount,
        });
      }
    );
  }

  onSubmit() {
    const ingName = this.form.value.name;
    const ingAmount = this.form.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  clearAllItmes() {
    this.shoppingListService.clearAll();
  }

  amountValidator(control: FormControl) {
    if (control.value <= 0) {
      return { countIsNotEmptyOrТegative: true };
    }
    return null;
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }
}
