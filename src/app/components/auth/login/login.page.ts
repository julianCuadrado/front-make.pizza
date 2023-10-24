import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService) { }

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
          localStorage.setItem(environment.headerToken, resp.jwt);
        },
        error: (error) => {
          alert(error.error.message);
        }
      });
    }
  }

}
