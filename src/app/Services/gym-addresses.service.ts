import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gym } from '../../assets/Gym';
import {Camera } from '../../assets/Camera';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class GymAddressesService {

  private activeGymObject = new BehaviorSubject<Gym>(new Gym(-1, '', '', '', '', [null]));
  activeGym = this.activeGymObject.asObservable();

  private errorMessageObject = new BehaviorSubject<String>("");
  errorMessage = this.errorMessageObject.asObservable();

  constructor(private http: HttpClient) {
  }

  setErrorMessage(message: String) {
    this.errorMessageObject.next(message);
  }



  setActiveGym(message: Gym) {
    this.activeGymObject.next(message);
    if (message.cameras.length < 2) {
      for (let i = 0; i < message.cameras.length; i++) {
        message.cameras[i].setPopulationData(this.getPopulationForCamera(message.cameras[i].getCameraID()));
      }
    } else {
      for (let i = 0; i < message.cameras.length; i++) {
        message.cameras[i].setPopulationData(this.getDayForCamera(message.cameras[i].getCameraID()));
      }
    }
  }

  checkAccessCode(accessCode: string) {
    this.http.post('https://gym-backend.herokuapp.com/getGymAndCamerasFromAccessCode', {"accessCode": accessCode}, {observe: 'response'})
      .subscribe(
        resp => {
        this.setErrorMessage("");
        let CamerasArray = [];
        let newGym = new Gym(resp['body']['gym']['id'], resp.body['gym']['name'], resp.body['gym']['address'], resp.body['gym']['city'], resp.body['gym']['country'], resp.body['cameras']);
        this.setActiveGym(newGym);

      },
      error => {
        this.setErrorMessage('invalid access code');
      }

      );
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

  getDayForCamera(cameraID: Number) {

    let promise = new Promise((resolve, reject) => {
      this.http.get('https://gym-backend.herokuapp.com/getTodayFromCamera/' + cameraID)
      .subscribe(resp => {
        resolve(resp);
      });
    });
    return promise;
  }

}
