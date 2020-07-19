export interface IRecipe{
    id:number;
    idParent:number;
    name:string;
    date:string;
    description:string;
    collection:Array<IRecipe>;
}