import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gym } from '../../assets/gym';
import { MockData } from '../../assets/mockData';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class GymAddressesService {

  private _listOfGyms: Gym[] = new Array();
  private results: any;
  private activeGymObject = new BehaviorSubject<Gym>(new Gym(-1, '', '', '', ''));
  private listOfGymsArray = new BehaviorSubject<Gym[]>(new Array());

  activeGym = this.activeGymObject.asObservable();
  listOfGyms = this.listOfGymsArray.asObservable();

  constructor(private http: HttpClient) {
    this.http.get('https://gymcounter-api.herokuapp.com/gyms.json').subscribe(data => {
      this.results = data;

      for (let i = 0; i < this.results.length; i++) {
        this._listOfGyms.push(new Gym(this.results[i].id, this.results[i].name, this.results[i].address, this.results[i].city, this.results[i].country));
      }
      this.listOfGymsArray.next(this._listOfGyms);
    });

    this.addPopulationData();
  }


  setActiveGym(message: Gym) {
    this.activeGymObject.next(message);
  }


  getPopulationForGym(specificGym: Gym) {
    const gym_id = specificGym.getId();
    const request_url = 'https://gymcounter-api.herokuapp.com/populations/' + gym_id.toString() + '.json';
      this.http.get(request_url).subscribe(data => {
        specificGym.setPopulation(data['population']);
        this.setActiveGym(specificGym);
      });

  }

}
