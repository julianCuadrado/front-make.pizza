import { Product } from "./product";

export class Item {

    id!: number;
    product!: Product;
    amount: number = 0;
    valorUnitario: number = 0;
}