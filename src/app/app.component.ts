import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Recipe } from "../app/shared/classes/recipe.model";
import { RecipesService } from "../app/shared/services/recipes.service";
import { IRecipe } from './shared/interfaces/recipe.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private modalService: BsModalService,
    public service: RecipesService) { }

  title = 'CookBook';
  modalRef: BsModalRef;
  formData: Recipe;
  recipes: Array<IRecipe> = [];
  recipe: IRecipe;
  editStatus: boolean;
  name: string;
  id: number;
  idParent: number;
  description: string;
  date: string;
  collection: Array<IRecipe>;

  ngOnInit() {
    this.getAllRecipes();
    this.resetForm();
  }


  getAllRecipes() {
    this.service.getJSONRecipes().subscribe(
      data => {
        this.recipes = data;
      }
    );
    this.resetForm();
  }


  resetForm(form?) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      idParent: null,
      name: '',
      date: '',
      description: '',
      collection: []
    };
  }

  openModal(template: TemplateRef<any>, recipe) {
    this.modalRef = this.modalService.show(template);
    console.log(recipe);
    this.recipe = this.recipe;

  }

  onSubmit(form: NgForm) {
    const data: IRecipe = Object.assign({}, form.value);
    let d = new Date();
    console.log(d.getTime());

    // data.date = toString(new Date());
    // console.log(data.date);

    // if (!this.editStatus) {
    this.service.postJSONRecipes(data)
      .subscribe(
        res => {
          console.log(res);
          this.getAllRecipes();
        });
    // } else {
    //   this.service.updateBanknote(data).subscribe(
    //     () => {
    //       this.getForAdmin();
    //     }
    //   )
    // }
    this.editStatus = false;
    this.resetForm();
  }

}
