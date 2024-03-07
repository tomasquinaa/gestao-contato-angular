import { Component } from '@angular/core';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent {
  isshow = false;

  signup() {
    this.isshow = true;
  }

  login() {
    this.isshow = false;
  }
}
