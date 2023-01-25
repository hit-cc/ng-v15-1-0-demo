import { environment } from './../../../../environments/environment';
import { FirebaseAuthService } from './../../services/firebase.auth.service';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';

import { WindowService } from '../../services/window.service';
export class PhoneNumber {
  country!: string;
  area!: string;
  prefix!: string;
  line!: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}
@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css'],
})
export class PhoneLoginComponent implements OnInit {
  windowRef: any;
  phone: any;
  phoneNumber = new PhoneNumber();
  verificationCode: any;

  user: any;
  constructor(
    private win: WindowService,
    private _authService: FirebaseAuthService
  ) {}

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    firebase.initializeApp(environment.firebaseConfig);
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container'
    );
    this.windowRef.recaptchaVerifier.render().then((widgetId: string) => {
      this.windowRef.recaptchaWidgetId = widgetId;
    });
  }
  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;
    console.log('number', num);
    this._authService
      .signInWithPhoneNumber(num, appVerifier)
      .then((res: any) => {
        console.log('success res of signInWithPhoneNumber =>', res);
        this.windowRef.confirmationResult = res;
      })
      .catch((err: any) => {
        console.log('signInWithPhoneNumber error=>>', err);
      });
    // firebase
    //   .auth()
    //   .signInWithPhoneNumber(num, appVerifier)
    //   .then((result: any) => {
    //     this.windowRef.confirmationResult = result;
    //   })
    //   .catch((error: any) => console.log('error', error));
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result: any) => {
        this.user = result.user;
        console.log(result);
      })
      .catch((error: any) => console.log(error, 'Incorrect code entered?'));
  }
}
