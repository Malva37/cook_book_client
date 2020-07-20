import { IRecipe } from "../interfaces/recipe.interfaces";

export class Recipe implements IRecipe {
    constructor(
        public recipeId: number,
        public parentRecipeId: number,
        public nameRecipe: string,
        public description: string,
        public createdDate: string
    ) { }

}