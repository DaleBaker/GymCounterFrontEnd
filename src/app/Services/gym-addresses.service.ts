import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gym } from '../../assets/gym';
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

  yeppers;

  constructor(private http: HttpClient) {
  }


  setActiveGym(message: Gym) {
    this.activeGymObject.next(message);
    for (let i = 0; i < message.cameras.length; i++) {
      this.getPopulationForCamera(message.cameras[i].getCameraID());
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
    console.log('https://gym-backend.herokuapp.com/getLastWeekFromCamera/' + cameraID);
        this.http.get('https://gym-backend.herokuapp.com/getLastWeekFromCamera/' + cameraID)
      .subscribe(resp => {
        this.activeGymObject.subscribe(activeGym => this.yeppers = activeGym);
        console.log(resp);
        let cameras = this.activeGymObject.value.getCameras();
        for (let i = 0; i < cameras.length; i++) {
          if (cameras[i].getCameraID() == cameraID) {
            cameras[i].setPopulationData(resp);
          }
        }

      });

  }

}
