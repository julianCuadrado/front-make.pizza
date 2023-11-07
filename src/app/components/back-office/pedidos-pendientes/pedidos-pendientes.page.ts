import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { LoadingController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pedidos-pendientes',
  templateUrl: './pedidos-pendientes.page.html',
  styleUrls: ['./pedidos-pendientes.page.scss'],
})
export class PedidosPendientesPage implements OnInit {

  bills: Array<any> = [];
  selectedBill: any;
  isModalOpen = false;

  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  map!: google.maps.Map;
  loader = new Loader({
    apiKey: environment.apiKeyGoogleMaps,
    version: "weekly",
    libraries: ["places"]
  });

  constructor(
    private productService: ProductService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getBills();
  }

  handleRefresh(event: any) {
    this.productService.getBills()
    .subscribe({
      next: (resp: any) => {
        event.target.complete();
        this.bills = resp;
        console.log(resp);
      },
      error: (error) => {
        event.target.complete();
        alert(error.error.message);
      }
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async getBills() {
    await this.showLoading();
    this.productService.getBills()
    .subscribe({
      next: (resp: any) => {
        this.closeLoading();
        this.bills = resp;
      },
      error: (error) => {
        this.closeLoading();
        alert(error.error.message);
      }
    });
  }

  selectBill(currentBill: any) {
    this.selectedBill = currentBill;
    this.createMap(currentBill.latitude, currentBill.longitude);
    this.setOpen(true);
  }

  closeDetailBill() {
    this.setOpen(false);
  }

  async desabledBill() {
    await this.showLoading();
    this.productService.desabledBill(this.selectedBill.id).subscribe({
      next: (resp) => {
        this.closeLoading();
        this.setOpen(false);
        this.bills = this.bills.filter(b => b.id !== this.selectedBill.id);
        alert('Proceso realizado con exito.');
      }, error: error => {
        this.closeLoading();
        this.setOpen(false);
        alert(error.error.message);
      }
    })
  }

  createMap(lat: number, lng: number) {
    let mapOptions = {
      center: {
        lat: lat,
        lng: lng
      },
      zoom: 15
    };
    this.loader
    .importLibrary('maps')
    .then(({Map}) => {
      this.map =new Map(this.mapRef.nativeElement, mapOptions);
      this.addMarker(mapOptions);
    })
    .catch((e) => {
      alert(JSON.stringify(e));
    });
  }

  addMarker(mapOptions: any) {
    let myLatlng = new google.maps.LatLng(mapOptions.center.lat, mapOptions.center.lng);
    new google.maps.Marker({
      position: myLatlng,
      label: 'C',
      map: this.map
    });    
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
