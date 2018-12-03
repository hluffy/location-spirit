import { Component } from '@angular/core';

export const appUrl = 'http://localhost:8080/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'location-spirit';
}
