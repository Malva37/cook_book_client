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
  recipe: IRecipe;
  nameRecipe: string;
  id: number;
  parentId: number;
  description: string;
  createdDate: string;
  recipeList: any = [];
  editStatus: boolean = false;
  showCreateModal: boolean = true;
  readMore: boolean = false;
  showChildrens: boolean = false;

  ngOnInit() {
    this.getAllRecipes("");
  }

  getAllRecipes(id) {
    this.service.getAll(id).subscribe(
      data => {
        this.recipeList = data;
        this.recipeList.forEach(element => {
          element.children = [];
        });
      }, error => {
        console.log(error);
      }
    );
  }

  showChildren(recipe, event?) {
    this.showChildrens = !this.showChildrens;
    this.recipe = recipe;
    if (this.showChildrens) {
      this.service.getAll(recipe.id).subscribe(
        data => {
          recipe.children = data;
          this.showChildrens = true;
          event.target.className = 'fa fa-angle-up';
        }
      )
    } else {
      recipe.children = [];
      this.showChildrens = false;
      event.target.className = 'fa fa-angle-down';
    }
  }

  showText(event) {
    this.readMore = !this.readMore;
    if (this.readMore) {
      event.target.classList = 'descriptionBig';
      this.readMore = true;
    } else {
      event.target.classList = 'descriptionLittle';
      this.readMore = false;
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
    this.showCreateModal = true;
    this.resetForm();

  }

  onEdit(template: TemplateRef<any>, recipe) {
    this.modalRef = this.modalService.show(template);
    this.service.formData = Object.assign({}, recipe);
    this.editStatus = true;
    this.showCreateModal = false;
  }

  onSubmit(form: NgForm) {
    const data: IRecipe = Object.assign({}, form.value);
    if (this.editStatus) {
      this.updateRecipe(data);
    } else {
      this.createRecipe(data);
    }
    this.editStatus = false;
    this.resetForm();
  }

  private createRecipe(data: IRecipe) {
    data.parentId = this.recipe.id;
    this.service.create(data)
      .subscribe(
        res => {
          let response = JSON.parse(JSON.stringify(res));
          if (response.parentId) {
            this.showChildren(this.recipe);
          }
          else {
            this.recipeList.push(res);
          }
        })
  }

  private updateRecipe(data: IRecipe) {
    this.service.update(data).subscribe(
      data => {
        let response = JSON.parse(JSON.stringify(data));
        if (response.parentId) {
          for (const iterator of this.recipeList) {
            this.showUpdatedRecipe(iterator, response); //todo: replace method with ngRx
          }
          this.recipe = response;
        }
        else {
          for (const key in this.recipeList) {
            if (this.recipeList[key].id == response.id) {
              this.recipeList[key] = response;
              return this.recipeList;
            }
          }
        }
      }
    )
  }

  showUpdatedRecipe(recipe: IRecipe, response: IRecipe) {
    if (recipe.id == response.id) {
      recipe.name = response.name;
      recipe.description = response.description;
      return;
    }
    else if (recipe.children && recipe.children.length > 0) {
      for (const child of recipe.children) {
        this.showUpdatedRecipe(child, response);
      }

    }
  }
}
