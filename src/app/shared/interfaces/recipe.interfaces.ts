export interface IRecipe{
    id:number;
    parentId:number;
    name:string;
    description:string;
    createdDate:string;
    children?:Array<IRecipe>
}