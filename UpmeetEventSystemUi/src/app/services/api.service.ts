import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favorite } from '../Interfaces/favorite';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7196/api';

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get(`${this.baseUrl}/Events`);
    //CONSIDER CREATING AN EVENT INTERFACE
  }
  createEvents(event: Event ){
    return this.http.post(`${this.baseUrl}/Events`, event);
  }
  getFavorites(userId: number){
    return this.http.get(`${this.baseUrl}/Favorites?userId=${userId}`);
  }
  addToFavorites(userId: number, eventId: number){
    return this.http.post(`${this.baseUrl}/Favorites`, userId)
  }
  removeFromFavorites(favoriteId: number, userId: number){
    return this.http.delete(`${this.baseUrl}/Favorites/${favoriteId}?userId=${userId}`)
  }

}
