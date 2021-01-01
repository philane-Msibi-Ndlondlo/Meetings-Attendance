import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  meetings: any;
  newMeeting: any;
  pastMeeting: any;


  constructor(private MeetingsService: GraphService) { }

  ngOnInit(): void {
    this.meetings = [];
    this.newMeeting = [];
    this.pastMeeting = [];
    this.MeetingsService.getEvents()
    .then(events => {
      this.meetings = events;
      this.meetings.forEach(event => {
        const now = moment();
        event.startTime = moment(event.start.dateTime).format('HH:mm');
        event.endTime = moment(event.end.dateTime).format('HH:mm');
        event.startDate = moment(event.start.dateTime).format('MMMM Do YYYY');
        event.endDate = moment(event.end.dateTime).format('MMMM Do YYYY');


        if ( (moment(event.start.dateTime).diff(now) < 0)) {
          event.show = false;
          this.pastMeeting.push(event);
        } else {
          event.show = true;
          this.newMeeting.push(event);
        }

      });
      console.log(this.meetings);

    });

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
      $('.collapsible').collapsible();
      $('.tabs').tabs();
  }

}
