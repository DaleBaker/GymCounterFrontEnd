import { Component, OnInit } from '@angular/core';
import { GymAddressesService } from '../../services/gym-addresses.service';
import { Gym } from '../../../assets/Gym';
declare var google: any;

@Component({
  selector: 'app-gym-display',
  templateUrl: './gym-display.component.html',
  styleUrls: ['./gym-display.component.css']
})

export class GymDisplayComponent implements OnInit {


   activeGym: Gym;

  constructor(private gymAddressesService: GymAddressesService) { }

  ngOnInit() {
    this.gymAddressesService.activeGym.subscribe(activeGym => this.activeGym = activeGym);

  }

}
