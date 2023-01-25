import { FirebaseAuthService } from './../../../core/services/firebase.auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public authService: FirebaseAuthService) {}

  ngOnInit() {}
}
