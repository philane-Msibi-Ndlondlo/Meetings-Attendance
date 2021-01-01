import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Client } from '@microsoft/microsoft-graph-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authenticated: boolean;

  constructor(private auth: AuthService, private router: Router) {

  }
  // The user
  user: any;

  ngOnInit() {
    this.user = {};
    this.authenticated = false;
  }

  async signIn() {
    // Temporary

    await this.auth.signIn();
    if (this.auth.authenticated) {
      this.authenticated = true;
      const token = await this.auth.getAccessToken();
      this.user = this.auth.user;
      this.router.navigate(['/dashboard']);
    }
  }

  async signOut() {
    this.user = null;
    await this.auth.signOut();
    this.authenticated = false;
  }

}
