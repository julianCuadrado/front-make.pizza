import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PayPalOrder } from 'src/app/models/ResultPayPal';
import { ProductService } from 'src/app/services/product.service';

declare var paypal: any;

@Component({
  selector: 'app-pasarela-paypal',
  templateUrl: './pasarela-paypal.page.html',
  styleUrls: ['./pasarela-paypal.page.scss'],
})
export class PasarelaPaypalPage implements OnInit {

  @ViewChild('paypal', {static: true}) paypalElement!: ElementRef;
  order!:any;

  constructor(
    private router: Router,
    private productService: ProductService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    let orderParam: any = this.router.getCurrentNavigation()?.extras.state; 
    if(orderParam && orderParam.order) {
      this.order = orderParam.order;
    } else {
      alert('Debe seleccionar un pedido');
      this.router.navigateByUrl('back-office/mis-pedidos');
    }
  }

  ionViewDidEnter() { 
    this.createPay();
  }

  createPay() {
    paypal
    .Buttons({
      createOrder: (data:any, actions:any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
                value: this.order.total,
                currency: 'USD' 
            }
        }]
        })
      },
      // Finalize the transaction
      onApprove: (data:any, actions:any) => {
        return actions.order.capture()
          .then((details:any) => {
            // Show a success message to the buyer
            let result: PayPalOrder = details;
            if (result.status == "COMPLETED") {
              this.processPay(result);
            }
            else {
              alert('Transacción no completada');
            }
          })
          .catch((err:any) => {
            console.log(err);
          })
      },
      onError: (err:any) => {
        console.log(err)
      }
    })
    .render(this.paypalElement.nativeElement);
  }

  toFixed(amount: number, basePrice: number) {
    return Number((amount * basePrice).toFixed(1));
  }

  async processPay(result: PayPalOrder) {
    await this.showLoading();
    let pay = {
      payPalOrder: result,
      order: this.order
    };
    this.productService.processPay(pay)
    .subscribe({
      next: (resp: any) => {
        this.closeLoading();
        this.router.navigateByUrl('back-office/resultado-pago');
      },
      error: (error) => {
        this.closeLoading();
        alert(error.error.message);
      }
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando pago...',
      id: 'loadId'
    });
    loading.present();
  }

  async closeLoading() {
    return await this.loadingCtrl.dismiss('loadId');
  }
}
