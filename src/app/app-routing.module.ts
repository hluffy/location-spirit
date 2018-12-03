import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './components/content/map/map/map.component';

const routes: Routes = [
  { path: '', redirectTo: 'map/map', pathMatch: 'full' },
  {
    path: 'map',children: [
      {
        path: '', component: MapComponent
      },
      {
        path: 'map', component: MapComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
