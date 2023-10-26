import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.page.html',
  styleUrls: ['./mis-pedidos.page.scss'],
})
export class MisPedidosPage implements OnInit {

  currentOrder?: Pedido;
  total: number = 0;

  constructor(
    private productService: ProductService
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

  confirm() {

  }
}
