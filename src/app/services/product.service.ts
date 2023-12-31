import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { Ingredient } from '../models/ingredient';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private urlBase: string = '';  

  constructor(public http: HttpClient) { 
    this.urlBase = environment.urlBackend;
  }

  getAllPizzas(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlBase + 'products');
  }

  getAllDrinks(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlBase + 'products/drinks');
  }

  getAlladditional(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlBase + 'products/additional');
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Product[]>(this.urlBase + 'ingredients');
  }

  saveOrder(pedido: Pedido): Observable<any> {
    return this.http.post(this.urlBase+ 'orders', pedido);
  }

  desabledOrder(idOrder: number): Observable<any> {
    return this.http.put(this.urlBase+ 'orders?idOrder=' + idOrder, null);
  }

  getCurrentOrder(): Observable<Pedido> {
    return this.http.get<Pedido>(this.urlBase + 'orders');
  }

  processPay(pay: any): Observable<any> {
    return this.http.post(this.urlBase+ 'paypal', pay);
  }

  getBills(): Observable<any> {
    return this.http.get<any>(this.urlBase + 'bills');
  }

  desabledBill(idBill: any): Observable<any> {
    return this.http.put(this.urlBase+ 'bills?id='+idBill, {});
  }

  getConfigMapShop(): Observable<any> {
    return this.http.get(this.urlBase + 'system-parameters/configuration-map-shop');
  }

  getPriceMinuteDelivery(): Observable<any> {
    return this.http.get(this.urlBase + 'system-parameters/price-minute-delivery');
  }
}
