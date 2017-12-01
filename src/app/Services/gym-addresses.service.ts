import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class GymAddressesService {

  listOfGyms = new Array();
  results: string[];

  constructor(private http: HttpClient) {
    this.http.get('https://www.reddit.com/user/raumkraehe/comments.json').subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);
      this.results = data['data']['children'];
      console.log(this.results);

    });

    const body = {name: 'Anytime Fitness',
      address: '240 Colombo St, Christchurch',
      population: 0 };


    http.post('https://gymcounter-api.herokuapp.com/gyms', body, {
      })
      .subscribe();
  }

  listGyms() {
    console.log(this.listOfGyms);
  }


}
