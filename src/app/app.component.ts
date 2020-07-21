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
  id: number;
  parentId: number;
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
        console.log(data);

        this.recipes = data;
        console.log(this.recipes);

      }, error => {
        console.log(error);
      }
    );
    this.resetForm();
  }


  showChildren(recipe){
    console.log(recipe.id);
    this.service.get(recipe.id).subscribe(
      data =>{
        console.log(data);
        
      }
    )
    
  }

  resetForm(form?) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      parentId: null,
      name: '',
      description: '',
      createdDate: ''
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
    let dd = String(d.getDate()).padStart(2, '0');
    let mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = d.getFullYear();
    data.createdDate =  dd + '/' + mm + '/' + yyyy;
    // if (!this.editStatus) {
    this.service.create(data)
      .subscribe(
        res => {
          console.log(res);
          // this.editStatus =true;
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
