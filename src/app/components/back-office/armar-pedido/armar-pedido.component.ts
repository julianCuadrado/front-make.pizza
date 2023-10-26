import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Ingredient } from 'src/app/models/ingredient';
import { Pedido } from 'src/app/models/pedido';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-armar-pedido',
  templateUrl: './armar-pedido.component.html',
  styleUrls: ['./armar-pedido.component.scss'],
})
export class ArmarPedidoComponent  implements OnInit {

  @Input() product!: Product;
  
  cantidadPizzas: number = 0;

  bebidas: Product[] = [];
  adicionales: Product[] = [];
  ingredients: Ingredient[] = [];
  esPersonalizada: boolean = false;
  pedido: Pedido = new Pedido();

  constructor(
    private modalCtrl: ModalController,
    private productService: ProductService) {}

  ngOnInit() {
    this.getAllDrinks();
    this.getAlladditional();
    this.esPersonalizada = !this.product.ingredients || !this.product.ingredients.length;
    if(this.esPersonalizada) {
      this.getAllIngredients();
    }
    this.getCurrentProduct();  
  }

  getCurrentProduct() {
    this.productService.getCurrentOrder()
    .subscribe({
      next: (resp: Pedido) => {
        if(resp !== null) {
          this.pedido.id = resp.id;
          this.pedido.dateOrder = resp.dateOrder;
          this.pedido.items = resp.items;
          this.pedido.enabled = resp.enabled;
        }
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }

  getAllIngredients() {
    this.productService.getAllIngredients()
    .subscribe({
      next: (resp: Ingredient[]) => {
        this.ingredients = resp;
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }

  getAlladditional() {
    this.productService.getAlladditional()
    .subscribe({
      next: (resp: Product[]) => {
        this.adicionales = resp;
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }

  getAllDrinks() {
    this.productService.getAllDrinks()
    .subscribe({
      next: (resp: Product[]) => {
        this.bebidas = resp;
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }

  cancel() {
    return this.modalCtrl.dismiss('cancel');
  }

  confirm() {
    if(this.cantidadPizzas <= 0) {
      alert("Ingrese la cantidad de pizzas que va a pedir.");
      return;
    }
    this.pedido.agregarItem(this.product, this.cantidadPizzas);
    this.bebidas.filter(b => b.selected).map(e =>{
        this.pedido.agregarItem(e, 1);
    });
    this.adicionales.filter(a => a.selected).map(e=>{
      this.pedido.agregarItem(e, 1);
    });
    
    this.productService.saveOrder(this.pedido).subscribe({
      next: (resp: any) => {
        return this.modalCtrl.dismiss('confirm');
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }
}
