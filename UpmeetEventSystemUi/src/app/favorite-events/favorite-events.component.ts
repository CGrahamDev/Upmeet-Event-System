import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-favorite-events',
  imports: [CommonModule],
  templateUrl: './favorite-events.component.html',
  styleUrl: './favorite-events.component.css'
})
export class FavoriteEventsComponent implements OnInit {
favorites: any[] = [];
  constructor(private apiService: ApiService){};

ngOnInit(): void {
    this.apiService.getFavorites().subscribe(data => {
      this.favorites = data as any[];
    })
}
}
