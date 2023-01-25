import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FirebaseUser } from './firebase-user';
import * as auth from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  userData: any;
  userKey = environment.keys.user_auth_key;
  constructor(
    private _afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this._afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem(this.userKey, JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem(this.userKey)!);
      } else {
        localStorage.setItem(this.userKey, 'null');
        JSON.parse(localStorage.getItem(this.userKey)!);
      }
    });
  }

  /* Sign in with email password */
  signInWithEmailPassword(email: string, password: string) {
    return this._afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this._afAuth.authState.subscribe((user) => {
          if (user) {
            this.userData = user;
            localStorage.setItem(this.userKey, JSON.stringify(this.userData));
            if (this.isEmailVerifyed) {
              Swal.fire({ text: 'Welcome !', icon: 'success' });
              this.router.navigate(['/admin']);
            } else {
              Swal.fire({
                text: 'Your email is not verifyed yet! please verify',
                icon: 'info',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Verify',
                cancelButtonText: 'No',
              }).then((res: any) => {
                console.log('dismmiss', res);
                if (res.isConfirmed == true) {
                  Swal.fire('', 'Verification email sent!', 'success');
                  this.router.navigate(['/admin/login']);
                } else {
                  Swal.close();
                }
              });
            }
          } else {
            localStorage.setItem(this.userKey, 'null');
            JSON.parse(localStorage.getItem(this.userKey)!);
          }
        });
      })
      .catch((error) => {
        Swal.fire({ title: 'Error', icon: 'error', text: error.message });
      });
  }

  /**Signup create new user with email password */
  SignUp(email: string, password: string) {
    return this._afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this._afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/verify-email-address']);
      });
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    return this._afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        Swal.fire({ text: 'Password reset email sent, check your inbox.' });
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  signInWithPhoneNumber(phoneNumber: string, recaptchaVerifier: any) {
    return this._afAuth
      .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // window.confirmationResult = confirmationResult;
        Swal.fire({
          text: JSON.stringify(confirmationResult),
          icon: 'success',
          confirmButtonText: 'Okay',
        });
      })
      .catch(function (error) {
        // Error; SMS not sent
        // ...
        window.alert(error);
      });
  }

  signInWithEmailLink(email: string, emailLink?: string) {
    return this._afAuth.signInWithEmailLink(email, emailLink);
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(this.userKey)!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['/admin']);
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this._afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/admin']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: FirebaseUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this._afAuth.signOut().then(() => {
      localStorage.removeItem(this.userKey);
      this.router.navigate(['admin/login']);
    });
  }

  get isEmailVerifyed(): boolean {
    const user = JSON.parse(localStorage.getItem(this.userKey)!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
}
