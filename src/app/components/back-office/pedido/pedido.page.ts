import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ArmarPedidoComponent } from '../armar-pedido/armar-pedido.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  public listaPizzas: Product[] = [];

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
   this.loadDataPage(); 
  }

  async loadDataPage() {
    await this.showLoading();
    this.productService.getAllPizzas()
    .subscribe({
      next: (resp: Product[]) => {
        this.closeLoading();
        this.listaPizzas = resp;
      },
      error: (error) => {
        this.closeLoading();
        alert(error.error.message);
      }
    });
  }

  handleRefresh(event: any) {
    this.productService.getAllPizzas()
    .subscribe({
      next: (resp: Product[]) => {
        event.target.complete();
        this.listaPizzas = resp;
      },
      error: (error) => {
        event.target.complete();
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
      this.presentAlertOrder();
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      id: 'loadId'
    });
    loading.present();
  }

  async closeLoading() {
    return await this.loadingCtrl.dismiss('loadId');
  }

  async presentAlertOrder() {
    const alert = await this.alertController.create({
      header: 'Pedido agregado con exito.',
      subHeader: '¿Desea ir a mis pedidos?',
      buttons: [{
        text: 'Seguir pidiendo',
        role: 'cancel',
        cssClass: 'alert-button-cancel'
      },{
        text: 'Si',
        role: 'confirm',
        cssClass: 'alert-button-confirm',
        handler: () => {
          this.router.navigateByUrl('back-office/mis-pedidos');
        }
      }],
    });

    await alert.present();
  }
}
