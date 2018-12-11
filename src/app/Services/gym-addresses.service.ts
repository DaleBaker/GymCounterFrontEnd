import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gym } from '../../assets/Gym';
import {Camera } from '../../assets/Camera';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class GymAddressesService {

  private _listOfGyms: Gym[] = new Array();
  private results: any;
  private activeGymObject = new BehaviorSubject<Gym>(new Gym(-1, '', '', '', '', [null]));
  private listOfGymsArray = new BehaviorSubject<Gym[]>(new Array());

  activeGym = this.activeGymObject.asObservable();
  listOfGyms = this.listOfGymsArray.asObservable();


  constructor(private http: HttpClient) {
  }


  setActiveGym(message: Gym) {
    this.activeGymObject.next(message);
    for (let i = 0; i < message.cameras.length; i++) {
      message.cameras[i].setPopulationData(this.getPopulationForCamera(message.cameras[i].getCameraID()));
    }
  }

  checkAccessCode(accessCode: string) {
    this.http.post('https://gym-backend.herokuapp.com/getGymAndCamerasFromAccessCode', {"accessCode": accessCode}, {observe: 'response'})
      .subscribe(resp => {
        let CamerasArray = [];
        let newGym = new Gym(resp['body']['gym']['id'], resp.body['gym']['name'], resp.body['gym']['address'], resp.body['gym']['city'], resp.body['gym']['country'], resp.body['cameras']);
        this.setActiveGym(newGym);

      });
  }


  getPopulationForCamera(cameraID: Number) {
    let promise = new Promise((resolve, reject) => {
      this.http.get('https://gym-backend.herokuapp.com/getLastWeekFromCamera/' + cameraID)
      .subscribe(resp => {
        resolve(resp);
      });
    });
    return promise;
  }

}
