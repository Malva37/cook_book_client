import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Recipe } from "../app/shared/classes/recipe.model";
import { RecipesService } from "../app/shared/services/recipes.service";
import { IRecipe } from './shared/interfaces/recipe.interfaces';

export class NavigationModel {
  public title: string;
  public url?: string;
  public children: NavigationModel[];
}

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
  showChildrenBlock: boolean = false;
  updateChildren: boolean = false;
  list: any = [];



  ngOnInit() {
    this.getAllRecipes("");
  }
  showButtons(e) {
    console.log(e.children[1]);

  }

  getAllRecipes(id) {
    this.service.getAll(id).subscribe(
      data => {
        this.list = data;
        this.list.forEach(element => {
          element.children = [];
        });
      }, error => {
        console.log(error);
      }
    );
    this.resetForm();
  }
  showChildren(recipe) {
    if (this.updateChildren) {
      this.service.getAll(recipe.parentId).subscribe(
        data => {
          console.log(data);

          recipe = data;
          console.log(recipe);

          this.updateChildren = false;
          return recipe
        }
      )
    } else {
      this.recipe = recipe;
      this.service.getAll(recipe.id).subscribe(
        data => {
          recipe.children = data;
        }
      )
    }
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
      createdDate: '',
      children: []
    };

  }
  openModal(template: TemplateRef<any>, recipe) {
    this.modalRef = this.modalService.show(template);
    this.recipe = recipe;
    console.log(this.recipe);


  }
  onEdit(template: TemplateRef<any>, recipe) {
    this.modalRef = this.modalService.show(template);
    this.service.formData = Object.assign({}, recipe);
    this.editStatus = true;
    this.recipe = recipe;
  }

  onSubmit(form: NgForm) {
    const data: IRecipe = Object.assign({}, form.value);
    if (this.editStatus) {                         // edit
      this.service.update(data).subscribe(
        data => {
          let response = JSON.parse(JSON.stringify(data));
          if (response.parentId) {
            this.updateChildren = true;
            this.showChildren(response);
          } else {
            for (const key in this.list) {
              if (this.list[key].id == response.id) {
                this.list[key] = response;
                return this.list
              }
            }
          }
        }
      )
    } else {
      data.parentId = this.recipe.id;              // create
      this.service.create(data)
        .subscribe(
          res => {
            let response = JSON.parse(JSON.stringify(res));
            if (response.parentId) {
              this.showChildren(this.recipe);
            } else {
              this.list.push(res);
            }
          });
    }
    this.editStatus = false;
    this.resetForm();
  }

}
