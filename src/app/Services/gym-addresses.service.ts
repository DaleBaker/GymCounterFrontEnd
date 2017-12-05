import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Gym} from '../../assets/gym';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class GymAddressesService {

  private _listOfGyms: Gym[] = new Array();
  private results: any;
  private activeGymObject = new BehaviorSubject<Gym>(new Gym('', '', 0));
  private listOfGymsArray = new BehaviorSubject<Gym[]>(new Array());
  private gymHasBeenSelected = new BehaviorSubject<boolean>(false);

  activeGym = this.activeGymObject.asObservable();
  listOfGyms = this.listOfGymsArray.asObservable();
  gymSelected = this.gymHasBeenSelected.asObservable();

  constructor(private http: HttpClient) {
    this.http.get('https://gymcounter-api.herokuapp.com/gyms.json').subscribe(data => {
      this.results = data;

      for (let i = 0; i < this.results.length ; i++) {
        this._listOfGyms.push(new Gym(this.results[i].name, this.results[i].address, this.results[i].population));
      }
      this.listOfGymsArray.next(this._listOfGyms);
    });
  }

  setActiveGym(message: Gym) {
    this.activeGymObject.next(message);
  }

  setGymSelected(message: boolean) {
    this.gymHasBeenSelected.next(message);
  }

  createGym() {
    const body = {name: 'Anytime Fitness',
      address: '240 Colombo St, Christchurch',
      population: 0 };
    this.http.post('https://gymcounter-api.herokuapp.com/gyms', body, {
    })
      .subscribe();
  }


}
