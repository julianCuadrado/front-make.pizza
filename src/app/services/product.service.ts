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
}
