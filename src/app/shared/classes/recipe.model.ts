import { IRecipe } from "../interfaces/recipe.interfaces";

export class Recipe implements IRecipe {
    constructor(
        public id: number,
        public idParent: number,
        public name: string,
        public date: string,
        public description: string,
        public collection: Array<IRecipe>
    ) { }

}