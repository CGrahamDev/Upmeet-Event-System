import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Favorite } from '../Interfaces/favorite';
import { Event} from '../Interfaces/event';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorite-events',
  imports: [CommonModule, FormsModule],
  templateUrl: './favorite-events.component.html',
  styleUrl: './favorite-events.component.css'
})
export class FavoriteEventsComponent implements OnInit {
favorites: Favorite[] = [];
events: Event[] = [];
userId: number = 1;
eventId: number = 0;
favoriteId: number = 0;
hasUserId:boolean =  false
items: any[] =[];
  constructor(private apiService: ApiService){};

ngOnInit(): void {
    this.apiService.getEvents().subscribe(data => {
      this.events = data as Event[];
    })
    this.hasUserId=false;
    this.items = this.items.map(item => item.isHidden = true)
}

getFavorites(){
this.apiService.getFavorites(this.userId).subscribe(data => {
  this.favorites = data as Favorite[];
console.log("Successfully Received favorites");
})}
addToFavorites(): void{
  this.apiService.addToFavorites(
    {
      userId: this.userId,
      eventId: this.eventId
    }
  ).subscribe(() => {
    alert('Event was successfully added to your favorites');
  })
}

removeFromFavorite(): void{
  this.apiService.removeFromFavorites(this.favoriteId, this.userId ).subscribe(() => {
    alert('Event was removed from favorites')
  })
  console.log(`Removed Favorite ID: ${this.favoriteId} created by User ${this.userId}`)
}
}



