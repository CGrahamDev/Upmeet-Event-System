import { CommonModule } from '@angular/common';
import { Component, EventEmitter, NgModule, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';
import { Event } from '../Interfaces/event';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
events: any[] = [];
favorites: any[] = [];
items : any[] = []
userId: number = 1;
eventId: number = -1;
constructor(private apiService: ApiService){};

ngOnInit(): void {
    this.apiService.getEvents().subscribe(data => {
      this.events = data as any[];})
      this.items = this.items.map(item => item.isHidden = true)
    /*this.apiService.getFavorites(this.userId).subscribe(data => {
      this.favorites = data as any[];
    })*/
    
    };

    addToFavorites(): void{
      this.apiService.addToFavorites(
        {
          userId: this.userId,
          eventId: this.eventId
        }
      ).subscribe(() => {
        alert('Event was successfully added to your favorites');
      })
      console.log("Favorite successfully added")
    }



} 




