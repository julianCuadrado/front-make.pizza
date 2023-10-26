import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ArmarPedidoComponent } from '../armar-pedido/armar-pedido.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  public listaPizzas: Product[] = [];

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.productService.getAllPizzas()
    .subscribe({
      next: (resp: Product[]) => {
        this.listaPizzas = resp;
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }

  async openModal(product: Product) {
    const modal = await this.modalCtrl.create({
      component: ArmarPedidoComponent,
      componentProps: {
        'product': product
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
       console.log(data);
       
    }
  }
}
