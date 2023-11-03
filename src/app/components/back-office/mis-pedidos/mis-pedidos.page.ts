import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { ProductService } from 'src/app/services/product.service';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { OverlayEventDetail } from '@ionic/core/components';
import { environment } from 'src/environments/environment';
import { IonModal, ModalController } from '@ionic/angular/common';
import { GeoLocation } from 'src/app/models/geolocation';
import { ConfirmDirectionComponent } from '../confirm-direction/confirm-direction.component';
import { Product } from 'src/app/models/product';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.page.html',
  styleUrls: ['./mis-pedidos.page.scss'],
})

export class MisPedidosPage implements OnInit {

  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;

  @ViewChild('modal') modal!: IonModal;

  basePriceKMByOrder: number = 500;
  currentOrder!: Pedido | undefined;
  total: number = 0;
  directionSelected: any;
  isSelectedDirection: boolean = false;
  lastMarkerId?: string;
  markerShop: Marker = 
      {
        coordinate: {
          lat: 4.66,
          lng: -74.11
        },
        title: 'Tienda Principal'
      }
    ;

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.productService.getCurrentOrder()
    .subscribe({
      next: (resp: Pedido) => {
        this.currentOrder = resp;
        if(this.currentOrder) {
          this.total = this.currentOrder.items.reduce((total, item) => total + (item.product.price* item.amount), 0);
        }
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(this.currentOrder);
    }
  }

  cancelCaptureDirection() {
    this.modal.dismiss(null, 'cancel');
    this.newMap.destroy().then(()=>{
      console.log("se destruyo");   
    });
  }

  aproveCaptureDirection() {
    if(this.currentOrder) {
      this.isSelectedDirection = true;
      let quantityMeters = this.haversine_distance(this.markerShop, this.directionSelected);
      let p:Product = {
        id: 2,
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
      this.total += quantityMeters * this.basePriceKMByOrder;
      this.currentOrder.latitude = this.directionSelected.coordinate.lat;
      this.currentOrder.longitude = this.directionSelected.coordinate.lng;
    }
    this.modal.dismiss(null, 'confirm');
  }
  
  createMap() {
    this.lastMarkerId = undefined;
    GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKeyGoogleMaps,
      config: {
        center: {
          lat: 4.66,
          lng: -74.11,
        },
        zoom: 10,
      },
      forceCreate: true
    }).then((map)=>{
      this.newMap = map;
      this.addMarkers();
    }, (error) => {
      console.log(error);
    });
  }

  async addMarkers() {
    await this.newMap.addMarker(this.markerShop);
    this.newMap.setOnMarkerClickListener(async(marker) =>{

      const modal = await this.modalCtrl.create({
        component: ConfirmDirectionComponent,
        componentProps: {
          marker,
        },
        breakpoints: [0, 0.3],
        initialBreakpoint: 0.3,
        backdropDismiss: false,
        showBackdrop: false
      });
      modal.present();
    });

    await this.newMap.setOnMapClickListener(async(pointSelected) =>{
      this.directionSelected = {
        coordinate: {
          lat: pointSelected.latitude,
          lng: pointSelected.longitude
        }
      }
      if(this.lastMarkerId) {
        this.newMap.removeMarker(this.lastMarkerId).then(()=>{
        },(reason) => {
          console.log(reason);
        });
      }
      this.lastMarkerId = await this.newMap.addMarker(this.directionSelected);
    });
  }

  cancel() {
    if(this.currentOrder?.id) {
      this.productService.desabledOrder(this.currentOrder.id)
      .subscribe({
        next: (resp: any) => {
          this.currentOrder = undefined;
        },
        error: (error) => {
          alert(error.error.message);
        }
    });
    }
  }

  haversine_distance(mk1:any, mk2:any) {
    const distancia = GeoLocation.calculateDistance(
      mk1.coordinate.lat, // Latitud del punto 1
      mk1.coordinate.lng, // Longitud del punto 1
      mk2.coordinate.lat, // Latitud del punto 2
      mk2.coordinate.lng // Longitud del punto 2
    );  
    return Number(distancia.toFixed(2));
  }

  calculatePriceOrder(distance: number) {
    return this.basePriceKMByOrder * distance;
  }

  confirm() {

  }
}
