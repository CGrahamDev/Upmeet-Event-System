
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './events-form.component.html',
  styleUrl: './events-form.component.css'
})
export class EventsFormComponent implements OnInit {
  id : number = -1;
  title!: string;
    description!: string;
    date!: string;
    location!: string;
    events : any[] = [];
  constructor(private apiService: ApiService) {} 

  ngOnInit(): void {
      this.apiService.getEvents().subscribe(data => 
        {this.events = data as any})
  }
  createEvent(): void {
    this.apiService.createEvents(
      {
        title: this.title,
        description: this.description,
        date: this.date,
        location: this.location
      }
    ).subscribe(() => {
      alert('Event was created!');
    });
  }
}
