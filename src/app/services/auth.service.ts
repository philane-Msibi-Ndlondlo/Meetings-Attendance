import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { User } from '../models/User';
import { OAuthSettings } from './oauth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticated: boolean;
  public user: User;
  public token: string;

  constructor(private msalService: MsalService)
  {
    this.authenticated = false;
    this.user = null;
    this.token = '';
  }

  async signIn(): Promise<void> {
    const result = await this.msalService.loginPopup(OAuthSettings)
      .catch((reason) => {
        console.log(reason);

      });

    if (result) {
      this.authenticated = true;
      // Temporary placeholder
    }
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    this.user = null;
    this.authenticated = false;
    this.token = '';
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    const result = await this.msalService.acquireTokenSilent(OAuthSettings)
      .catch((reason) => {
        console.log(reason);

      });

    if (result) {
      // Temporary to display token in an error box
      console.log('', result);
      this.user = new User();
      this.user.displayName = result.account.name;
      this.user.email = result.account.userName;
      this.token = result.accessToken;
      console.log(this.token);

      return result.accessToken;
    }
    return null;
  }

  /* AuthenticateUser(payload) {

    const formdata = new HttpParams()
    .set('client_id', 'a30a4202-5690-4ef9-96b6-c9311ad462a0')
    .set('response_type', 'code')
    .set('scope', 'User.Read.All Mail.Read Contacts.Read')
    .set('redirect_uri', 'https://localhost:44362')
    .set('state', '12345');

    return this.http.post('https://login.microsoftonline.com/60fcf832-af35-4960-9056-4d242cb86b7c/oauth2/v2.0/authorize',
    formdata.toString(),
    { headers : new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') });
  } */


}
