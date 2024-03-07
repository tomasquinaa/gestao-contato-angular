import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signup } from '../contactmodel';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent implements OnInit {
  isshow = false;
  signupform!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      name: ['', Validators.required],
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
}
