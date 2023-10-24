import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    public tokenService: TokenService) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    if (this.formLogin.valid) {
      this.userService.authenticate(this.formLogin.value)
      .subscribe({
        next: (resp: any) => {
          this.tokenService.login(resp.jwt);
        },
        error: (error) => {
          alert(error.error.message);
        }
      });
    }
  }

}
