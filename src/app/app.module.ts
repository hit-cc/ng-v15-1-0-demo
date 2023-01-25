import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FirebaseAuthService } from './core/services/firebase.auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { ForgotPasswordComponent } from './core/components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './core/components/verify-email/verify-email.component';
import { PhoneLoginComponent } from './core/components/phone-login/phone-login.component';
import { WindowService } from './core/services/window.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    VerifyEmailComponent,
    PhoneLoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [FirebaseAuthService, WindowService],
  bootstrap: [AppComponent],
})
export class AppModule {}
