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
  recipes: any;
  recipe: IRecipe;
  editStatus: boolean = false;
  nameRecipe: string;
  recipeId: number;
  parentRecipeId: number;
  description: string;
  createdDate: string;
  currentRecipe = null;
  currentIndex = -1;


  ngOnInit() {
    this.getAllRecipes();
    this.resetForm();
  }


  getAllRecipes() {
    this.service.getAll().subscribe(
      data => {
        this.recipes = data;
      }, error =>{
        console.log(error);
      }
    );
    this.resetForm();
  }


  resetForm(form?) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      recipeId: null,
      parentRecipeId: null,
      nameRecipe: '',
      description: '',
      createdDate:''
    };
    this.currentRecipe = null;
    this.currentIndex = -1;
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

    // if (!this.editStatus) {
    this.service.create(data)
      .subscribe(
        res => {
          console.log(res);
          this.editStatus =true;
          // this.getAllRecipes();
        }, error =>{
          console.log(error);
          
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
