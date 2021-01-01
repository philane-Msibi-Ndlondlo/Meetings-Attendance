import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Client } from '@microsoft/microsoft-graph-client';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  graphClient: Client;

  constructor(private auth: AuthService) {

    this.graphClient = Client.init({
      authProvider: async (done) => {
        let token = await this.auth.getAccessToken()
        .catch(err => done(err, null));

        if (token) {
          done(null, token);
        } else {
          done('Could not get access token', null);
        }
      }
    });
  }

  async getEvents() {
    try {
      const result = await this.graphClient
      .api('/me/events')
      .select('id,subject,organizer,start,end,location,attendees')
      .orderby('createdDateTime DESC')
      .get();

      return result.value;

    } catch (error) {
      console.log(error);

    }
  }
}
