import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { CommunityComponent } from './community/community.component';

export const routes: Routes = [

    // {path:'weather/:filter', component:WeatherPageComponent, title:"Weather is nice today isn't it?"},
    {path:'community', component:CommunityComponent},
    {path:'home', component:HomeComponent},
    {path:'about',component:AboutComponent},
    { path: '', redirectTo: '/community', pathMatch: 'full' },

];
