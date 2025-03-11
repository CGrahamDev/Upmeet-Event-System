import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';
import { Event } from '../Interfaces/event';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
events: Event[] = [];

constructor(private apiService: ApiService){};

ngOnInit(): void {
    this.apiService.getEvents().subscribe(data => {
      this.events = data as Event[];
    })}



}
