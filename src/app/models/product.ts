import { Ingredient } from "./ingredient";

export interface Product{

    id: number;
    name: string;
    description: string;
    productType: string;
    urlImage: string;
    price: number;
    enabled: boolean;
    selected: boolean;
    ingredients: Ingredient[];
}