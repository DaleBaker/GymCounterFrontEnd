import { Component, OnInit } from '@angular/core';
import { GymAddressesService } from '../../Services/gym-addresses.service';
import { Gym } from '../../../assets/Gym';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  searchString: string;

  constructor(private gymAddressesService: GymAddressesService) {
  }

  ngOnInit() {

  }

  findGym() {
    this.gymAddressesService.checkAccessCode(this.searchString);
  }

}
