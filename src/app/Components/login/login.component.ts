import { Component, OnInit } from '@angular/core';
import { GymAddressesService } from '../../services/gym-addresses.service';
import { Gym } from '../../../assets/Gym';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  searchString: string;
  listOfGyms: Gym[];

  constructor(private gymAddressesService: GymAddressesService) {
  }

  ngOnInit() {
    this.gymAddressesService.listOfGyms.subscribe(listOfGyms => this.listOfGyms = listOfGyms);

  }

  findGym() {
    console.log(this.searchString);
    for (let i = 0; i < this.listOfGyms.length; i++) {
      if (this.listOfGyms[i].address.toLowerCase() === this.searchString.toLowerCase()) {
        this.gymAddressesService.setActiveGym(this.listOfGyms[i]);
      }
    }
  }

  addressesSimilar(a: string, b: string): boolean {

    return false;
  }

}
