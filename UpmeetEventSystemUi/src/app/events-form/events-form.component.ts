
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './events-form.component.html',
  styleUrl: './events-form.component.css'
})
export class EventsFormComponent implements OnInit {
  userId: number = -1;
  title: string = '';
  description: string = '';
  date: string = '';
  location: string = '';
  events: any[] = [];
  eventId = ((this.events.lastIndexOf(this.events)) + 1);
  
  //event : Event = {} as Event;

  /*
  event.id = {id: this.eventId};
  event.title = this.title;
    event.description = this.description;
    event.date = this.date;
    event.location = this.location;
  */
 
  constructor(private apiService : ApiService){};

  ngOnInit(): void {
      this.apiService.getEvents().subscribe(
        data => {this.events = data as any[]}
      )
  }

  createEvent(): void{
    this.apiService.createEvent([
      this.title,
      this.description,
      this.date,
      this.location,
  ]).subscribe(() => 
    alert('Event successfully created'))
  }
}
