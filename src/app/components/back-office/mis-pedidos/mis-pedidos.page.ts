import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { ProductService } from 'src/app/services/product.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { environment } from 'src/environments/environment';
import { IonModal, LoadingController, ModalController } from '@ionic/angular/common';
import { GeoLocation } from 'src/app/models/geolocation';
import { Product } from 'src/app/models/product';
import { Item } from 'src/app/models/item';
import { Router } from '@angular/router';
import { SelectDirectionComponent } from '../select-direction/select-direction.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.page.html',
  styleUrls: ['./mis-pedidos.page.scss'],
})

export class MisPedidosPage implements OnInit {

  @ViewChild('modal') modal!: IonModal;

  basePriceKMByOrder: number = 0.13;
  currentOrder!: Pedido | undefined;
  total: number = 0;
  isSelectedDirection: boolean = false;
  directionSelected: any;

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadDataPage();
  }

  async loadDataPage() {
    await this.showLoading();
    forkJoin([
      this.productService.getCurrentOrder(),
      this.productService.getPriceMinuteDelivery()
    ]).subscribe({
      next: responses => {
        this.closeLoading();
        this.currentOrder = responses[0];
        if(this.currentOrder) {
          this.total = this.currentOrder.items.reduce((total, item) => total + (item.product.price* item.amount), 0);
        }
        this.basePriceKMByOrder = Number(responses[1].valor);
      },
      error: error => {
        this.closeLoading();
        alert(error.error.message);
      }
    })
  }

  handleRefresh(event: any) {
    forkJoin([
      this.productService.getCurrentOrder(),
      this.productService.getPriceMinuteDelivery()
    ]).subscribe({
      next: responses => {
        event.target.complete();
        this.currentOrder = responses[0];
        if(this.currentOrder) {
          this.total = this.currentOrder.items.reduce((total, item) => total + (item.product.price* item.amount), 0);
        }
        this.basePriceKMByOrder = Number(responses[1].valor);
      },
      error: error => {
        event.target.complete();
        alert(error.error.message);
      }
    })
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(this.currentOrder);
    }
  }

  async selectDirection() {
    const modal = await this.modalCtrl.create({
      component: SelectDirectionComponent
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.directionSelected = data;
      this.aproveCaptureDirection(data);
    }
  }

  aproveCaptureDirection(objDirection: any) {
    if(this.currentOrder) {
      this.isSelectedDirection = true;
      let quantityMeters = Math.ceil(objDirection.elementDistance.duration.value/60);
      let p:Product = {
        id: 1,
        description: '',
        enabled: false,
        ingredients: [],
        name: 'Valor domicilio',
        price: this.basePriceKMByOrder,
        productType: '',
        selected: false,
        urlImage: ''
      }
      let item:Item = {
        amount: quantityMeters,
        id: 2,
        product: p,
        valorUnitario: this.basePriceKMByOrder
      }
      this.currentOrder.items.push(item);
      this.total += this.toFixed(quantityMeters, this.basePriceKMByOrder);
      this.currentOrder.latitude = objDirection.lat;
      this.currentOrder.longitude = objDirection.lng;
      this.currentOrder.direction = objDirection.direction;
    }
  }

  toFixed(amount: number, basePrice: number) {
    return Number((amount * basePrice).toFixed(1));
  }
  
  async cancel() {
    await this.showLoading();
    this.isSelectedDirection = false;
    if(this.currentOrder?.id) {
      this.productService.desabledOrder(this.currentOrder.id)
      .subscribe({
        next: (resp: any) => {
          this.closeLoading();
          this.currentOrder = undefined;
          alert('Orden cancelada');
        },
        error: (error) => {
          this.closeLoading();
          alert(error.error.message);
        }
    });
    }
  }

  async confirm() {
    if(!this.isSelectedDirection) {
      alert('Por favor establezca la dirección');
      return;
    }
    if(this.currentOrder) {
      this.currentOrder.total = this.total;
      this.router.navigateByUrl('/back-office/pasarela-paypal', { state: {
        order: this.currentOrder
      }});
    } else {
      alert('Debe seleccionar un pedido.');
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
}
