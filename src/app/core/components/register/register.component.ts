import { FirebaseAuthService } from './../../services/firebase.auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(public authService: FirebaseAuthService) {}

  ngOnInit() {}
}
