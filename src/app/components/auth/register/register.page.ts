import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SaveUserDTO } from 'src/app/models/save-user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formUser!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService) { }

  ngOnInit() {
    this.formUser = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
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

  saveUser() {
    if (this.formUser.valid) {
      this.userService.saveUser(this.formUser.value)
      .subscribe({
        next: (resp: any) => {
          localStorage.setItem(environment.headerToken, resp.jwt);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  };

}
