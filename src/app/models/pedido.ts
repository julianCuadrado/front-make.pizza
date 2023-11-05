import { Item } from "./item";
import { Product } from "./product";

export class Pedido {

    id!: number;
    dateOrder!: Date;
    items: Array<Item> = [];
    longitude!: number;
    latitude!: number;
    enabled!: boolean;
    total?: number;
    direction?: string;

    agregarItem(product: Product, cantidad: number) {
        let item = new Item();
        item.product = product;
        item.amount = cantidad;
        item.valorUnitario = product.price;
        this.items.push(item);
    }
}