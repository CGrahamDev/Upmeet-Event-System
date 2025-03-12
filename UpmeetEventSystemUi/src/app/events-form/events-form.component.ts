
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './events-form.component.html',
  styleUrl: './events-form.component.css'
})
export class EventsFormComponent {
  title!: string;
    description!: string;
    date!: string;
    location!: string;

  constructor(private apiService: ApiService) {} 
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
