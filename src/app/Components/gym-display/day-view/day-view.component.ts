import { Component, OnInit } from '@angular/core';
import { GymAddressesService } from '../../../services/gym-addresses.service';
import { Gym } from '../../../../assets/Gym';

declare var google: any;

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {


  constructor(private gymAddressesService: GymAddressesService) { }

  ngOnInit() {

  }

}
