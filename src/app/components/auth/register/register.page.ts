import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formUser!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public tokenService: TokenService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.formUser = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      repeatedPassword: new FormControl('', Validators.required)
    });
  }

  get errorControl() {
    return this.formUser.controls;
  }

  async saveUser() {
    if (this.formUser.valid) {
      await this.showLoading();
      this.userService.saveUser(this.formUser.value)
      .subscribe({
        next: (resp: any) => {
          this.closeLoading();
          this.tokenService.login(resp.jwt);
        },
        error: (error) => {
          this.closeLoading();
          console.log(error.error);
          
          alert(error.error.backendMessage);
        }
      });
    }
  };

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando...',
      id: 'loadId'
    });
    loading.present();
  }

  async closeLoading() {
    return await this.loadingCtrl.dismiss('loadId');
  }
}