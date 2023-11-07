import { Component, Input, OnInit } from '@angular/core';

import { LoadingController, ModalController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
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
  
  cantidadPizzas: number = 1;

  bebidas: Product[] = [];
  adicionales: Product[] = [];
  ingredients: Ingredient[] = [];
  esPersonalizada: boolean = false;
  pedido: Pedido = new Pedido();

  constructor(
    private modalCtrl: ModalController,
    private productService: ProductService,
    private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.esPersonalizada = !this.product.ingredients || !this.product.ingredients.length;
    this.getElements();
  }

  getElements() {
    this.showLoading('Cargando...');
    let list = [];
    list[0] = this.productService.getAllDrinks();
    list[1] = this.productService.getAlladditional();
    list[2] = this.productService.getCurrentOrder();
    if(this.esPersonalizada) {
      list[3] = this.productService.getAllIngredients();
    }
    forkJoin(list).subscribe({
      next: (responses: any) => {
        this.closeLoading();
        this.bebidas = responses[0];
        this.adicionales = responses[1];
        let resp = responses[2];
        if(resp !== null) {
          this.pedido.id = resp.id;
          this.pedido.dateOrder = resp.dateOrder;
          this.pedido.items = resp.items;
          this.pedido.enabled = resp.enabled;
        }
        if(this.esPersonalizada) {
          this.ingredients = responses[3];
        }
      },
      error: (error) => {
        this.closeLoading();
        alert('Error al obtener la respuesta de los servicios.')
      }
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
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
    this.showLoading('Procesando...');
    this.productService.saveOrder(this.pedido).subscribe({
      next: (resp: any) => {
        this.closeLoading();
        return this.modalCtrl.dismiss(null, 'confirm');
      },
      error: (error) => {
        this.closeLoading();
        alert(error.error.message);
      }
    });
  }

  async showLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message: message,
      id: 'loadId'
    });
    loading.present();
  }

  async closeLoading() {
    return await this.loadingCtrl.dismiss('loadId');
  }
}
