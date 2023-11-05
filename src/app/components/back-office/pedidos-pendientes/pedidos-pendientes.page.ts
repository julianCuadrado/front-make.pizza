import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-pedidos-pendientes',
  templateUrl: './pedidos-pendientes.page.html',
  styleUrls: ['./pedidos-pendientes.page.scss'],
})
export class PedidosPendientesPage implements OnInit {

  bills: Array<any> = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getBills();
  }

  getBills() {
    this.productService.getBills()
    .subscribe({
      next: (resp: any) => {
        this.bills = resp;
        console.log(resp);
      },
      error: (error) => {
        alert(error.error.message);
      }
    });
  }
}
