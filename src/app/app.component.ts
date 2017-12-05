import { Component } from '@angular/core';
import { GymAddressesService } from './services/gym-addresses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GymAddressesService]
})
export class AppComponent {
  gymSelected = false;

  constructor(private gymAddressesService: GymAddressesService) {
    this.gymAddressesService.gymSelected.subscribe(gymSelected => this.gymSelected = gymSelected);
  }
}
