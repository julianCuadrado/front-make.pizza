import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { IonTextarea, LoadingController, ModalController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-select-direction',
  templateUrl: './select-direction.component.html',
  styleUrls: ['./select-direction.component.scss'],
})
export class SelectDirectionComponent  implements OnInit {

  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  @ViewChild('textAreaDirection') txtAreaDirection!: IonTextarea;
  map!: google.maps.Map;
  currentMarker!: google.maps.Marker | null;
  direction!: string;
  elementDistance: any;
  isProccessMap: boolean = false;

  loader = new Loader({
    apiKey: environment.apiKeyGoogleMaps,
    version: "weekly",
    libraries: ["places"]
  });
  
  mapOptions = {
    center: {
      lat: 4.66,
      lng: -74.11
    },
    zoom: 12
  };

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    await this.showLoading('Cargando...');
    forkJoin([
      this.productService.getConfigMapShop()
    ]).subscribe({
      next: responses =>{
        this.mapOptions = JSON.parse(responses[0].valor);
        this.createMap();
      }, error: error => {
        console.log(error);
        this.closeLoading();
        alert('Erro en la parametrización');
      }
    });
  }

  createMap() {
    this.loader
    .importLibrary('maps')
    .then(({Map}) => {
      this.closeLoading();
      this.map =new Map(this.mapRef.nativeElement, this.mapOptions);
      this.addMarkerShop();
      this.map.addListener("click", (event: google.maps.MapMouseEvent) => {
        if(!this.isProccessMap) {
          this.addMarker(event.latLng!);
        }
      });
    })
    .catch((e) => {
      this.closeLoading();
      alert(JSON.stringify(e));
    });
  }

  async addMarker(position: google.maps.LatLng | google.maps.LatLngLiteral) {
    this.isProccessMap = true;
    await this.showLoading('Calculando...');
    if(this.currentMarker && this.currentMarker != null) {
      this.currentMarker.setMap(null); 
    }
    let marker = new google.maps.Marker({
      position,
      map: this.map,
      label: 'Y'
    });    
    this.currentMarker = marker;
    this.calculateDistance();
  }

  addMarkerShop() {
    let myLatlng = new google.maps.LatLng(this.mapOptions.center.lat, this.mapOptions.center.lng);
    new google.maps.Marker({
      position: myLatlng,
      label: 'T',
      map: this.map
    });    
  }

  calculateDistance() {
    if(!this.currentMarker) {
      return;
    }
    const service = new google.maps.DistanceMatrixService();
    const origin1 = { lat: this.mapOptions.center.lat, lng: this.mapOptions.center.lng };
    const origin2 = "Greenwich, England";
    const destinationA = "Stockholm, Sweden";
    let latD = Number(this.currentMarker.getPosition()?.lat());
    let lngD = Number(this.currentMarker.getPosition()?.lng());
    const destinationB = { lat: latD, lng: lngD };
    const request = {
      origins: [origin1, origin2],
      destinations: [destinationA, destinationB],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
    service.getDistanceMatrix(request).then((response) => {
      this.elementDistance = {
        distance: response.rows[0].elements[1].distance.text,
        duration: {
          text: response.rows[0].elements[1].duration.text,
          value: response.rows[0].elements[1].duration.value
        }
      }
      this.closeLoading();
      this.isProccessMap = false;
    }, error =>{
      this.closeLoading();
      this.isProccessMap = false;
      alert('Error al obtener la información del mapa');
    });
  }

  cancelCaptureDirection() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  aproveCaptureDirection() {
    if(!this.currentMarker) {
      alert('Por favor selecciona un punto en el mapa');
      return;
    }
    if(!this.direction || !this.direction.trim().length) {
      this.txtAreaDirection.setFocus();
      alert('Por favor especifique la dirección');
      return;
    }
    let objDirection = {
      lat: this.currentMarker.getPosition()?.lat(),
      lng: this.currentMarker.getPosition()?.lng(),
      direction: this.direction,
      elementDistance: this.elementDistance
    };
    this.modalCtrl.dismiss(objDirection, 'confirm');
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
