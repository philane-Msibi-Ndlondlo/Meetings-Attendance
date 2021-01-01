import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  authenticated: boolean;
  user: User;

  constructor(private Auth: AuthService) { }

  ngOnInit(): void {
    this.authenticated = this.Auth.authenticated;
    this.user = this.Auth.user;
    console.log(this.user);

  }

  signOut(): void {
    this.Auth.signOut();
    this.authenticated = false;
    this.user = null;
  }









}
