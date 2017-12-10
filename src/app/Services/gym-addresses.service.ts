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
  private gymHasBeenSelected = new BehaviorSubject<boolean>(false);

  activeGym = this.activeGymObject.asObservable();
  listOfGyms = this.listOfGymsArray.asObservable();
  gymSelected = this.gymHasBeenSelected.asObservable();

  constructor(private http: HttpClient) {
    this.http.get('https://gymcounter-api.herokuapp.com/gyms.json').subscribe(data => {
      this.results = data;

      for (let i = 0; i < this.results.length; i++) {
        this._listOfGyms.push(new Gym(this.results[i].id, this.results[i].name, this.results[i].address, this.results[i].city, this.results[i].country));
      }
      this.listOfGymsArray.next(this._listOfGyms);
    });

    // this.createGym('Snap Fitness', '205 Madras St');
    // this.createPopulation();

  }


  setActiveGym(message: Gym) {
    this.activeGymObject.next(message);
  }

  setGymSelected(message: boolean) {
    this.gymHasBeenSelected.next(message);
  }

  createGym(name: string, address: string) {
    const body = {
      name: name,
      address: address,
      city: 'Christchurch',
      country: 'New Zealand',

    };
    this.http.post('https://gymcounter-api.herokuapp.com/gyms', body, {observe: 'response'})
      .subscribe(resp => {
        console.log(resp);

      });
  }

  createPopulation() {
    const body = {
      population: {
        population: MockData.getMockPopulationData1(),
        gym_id: 1,
      }

    };
    this.http.post('https://gymcounter-api.herokuapp.com/populations', body, {observe: 'response'})
      .subscribe(resp => {
        // Here, resp is of type HttpResponse<MyJsonData>.
        // You can inspect its headers:
        console.log(resp);

      });
  }


  getPopulationForGym(specificGym: Gym) {
    const gym_id = specificGym.id;
    const request_url = 'https://gymcounter-api.herokuapp.com/populations/' +
      this.http.get('https://gymcounter-api.herokuapp.com/gyms.json').subscribe(data => {
        this.results = data;

        for (let i = 0; i < this.results.length; i++) {
          this._listOfGyms.push(new Gym(this.results[i].id, this.results[i].name, this.results[i].address, this.results[i].city, this.results[i].country));
        }
        this.listOfGymsArray.next(this._listOfGyms);
      });

  }
}
