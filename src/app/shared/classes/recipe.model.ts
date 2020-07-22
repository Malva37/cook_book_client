import { IRecipe } from "../interfaces/recipe.interfaces";

export class Recipe implements IRecipe {
    constructor(
        public id: number,
        public parentId: number,
        public name: string,
        public description: string,
        public createdDate: string,
        public children?:Array<IRecipe>
    ) { }

}