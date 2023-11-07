import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public tokenService: TokenService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async login() {
    if (this.formLogin.valid) {
      await this.showLoading();
      this.userService.authenticate(this.formLogin.value)
      .subscribe({
        next: (resp: any) => {
          this.closeLoading();
          this.tokenService.login(resp.jwt);
        },
        error: (error) => {
          this.closeLoading();
          alert(error.error.message);
        }
      });
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
