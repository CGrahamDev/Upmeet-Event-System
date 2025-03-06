import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { FavoriteEventsComponent } from './favorite-events/favorite-events.component';
import { EventsFormComponent } from './events-form/events-form.component';

export const routes: Routes = [
    {path:'Home', component: HomeComponent},
    {path:'Favorites', component:FavoriteEventsComponent}
    {path:'Plan', component:EventsFormComponent}
];
