import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GymAddressesService {

  listOfGyms = new Array();
  results: string[];

  constructor(private http: HttpClient) {
    this.http.get('http://www.reddit.com/user/raumkraehe/comments.json').subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);
      this.results = data['data']['children'];
      console.log(this.results);

    });

    this.http.get('https://gym-counter-server.herokuapp.com/gyms.json').subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);
      this.results = data['data']['children'];
      console.log(this.results);

    });
  }

  listGyms() {
    console.log(this.listOfGyms);
  }


}
