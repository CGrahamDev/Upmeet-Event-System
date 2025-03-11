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
  getFavorites(){
    return this.http.get(`${this.baseUrl}/Favorites`);
  }
  addToFavorites(favorite: Favorite){
    return this.http.post(`${this.baseUrl}/Favorites`, favorite)
  }


}
