import { Component } from '@angular/core';
import { GymAddressesService } from './services/gym-addresses.service';
import {Gym} from '../assets/Gym';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GymAddressesService]
})
export class AppComponent {
  activeGym: Gym;
  showContactPage = false;

  constructor(private gymAddressesService: GymAddressesService) {
    this.gymAddressesService.activeGym.subscribe(activeGym => this.activeGym = activeGym);


  }

  toggleAbout() {
    this.showContactPage = !this.showContactPage;
  }

  logoutOfGym() {
    this.gymAddressesService.setActiveGym(new Gym(-1, '', '', '', '', [null]));
  }
}
