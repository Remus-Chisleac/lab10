import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let username = this.loginForm.value.username;
      let password = this.loginForm.value.password;

      if (!username || !password) {
        return;
      }

      let ret = this.loginService.login(username, password)
        .subscribe(data => {
          localStorage.setItem('token', String(data));
          let token = localStorage.getItem('token');
          console.log(token);
          if (token) {
            this.router.navigate(["home"]);
          }
        });




    }
  }

}
