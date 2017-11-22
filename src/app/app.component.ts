import { Component } from '@angular/core';
import { GymAddressesService } from './services/gym-addresses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GymAddressesService]
})
export class AppComponent {
  title = 'app';

  constructor(private gymAddressesService: GymAddressesService) {
    }
  }
