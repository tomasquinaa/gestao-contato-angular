import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signup, login } from '../contactmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent implements OnInit {
  isshow = false;
  signupform!: FormGroup;
  loginform!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    // login
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signup() {
    this.isshow = true;
  }

  login() {
    this.isshow = false;
  }

  submitsignup() {
    this.http
      .post<signup>('http://localhost:3000/signup', this.signupform.value)
      .subscribe((res) => {
        alert('user sucesso!');
        this.signupform.reset();
      });
  }

  loginuser() {
    this.http.get<login[]>('http://localhost:3000/signup').subscribe(
      (res) => {
        // matching email & password
        const user = res.find((a: any) => {
          return (
            a.email === this.loginform.value.email &&
            a.password === this.loginform.value.password
          );
        });
        // check condition for login
        if (user) {
          // alert('Login com sucesso');
          this.loginform.reset();
          this.router.navigate(['/contactlist']);
          // storing data in local stoareg
          localStorage.setItem('logindata', JSON.stringify(user));
        } else {
          alert('usuário não encontrado com essas credenciais');
          this.loginform.reset();
        }
      },
      (err) => {
        alert('algo deu errado tentar depois de algum tempo');
        this.loginform.reset();
      }
    );
  }
}
