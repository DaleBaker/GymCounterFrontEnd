import { Component, OnInit } from '@angular/core';
import { GymAddressesService } from '../../services/gym-addresses.service';
import { Gym } from '../../../assets/Gym';
declare var google: any;
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-single-camera-view',
  templateUrl: './single-camera-view.component.html',
  styleUrls: ['./single-camera-view.component.css']
})
export class SingleCameraViewComponent implements OnInit {

   activeGym: Gym;
   numberOfPeople: Number;

  constructor(private gymAddressesService: GymAddressesService) { }

  ngOnInit() {
    this.gymAddressesService.activeGym.subscribe(activeGym => this.activeGym = activeGym);
    google.charts.load('current', {packages: ['corechart', 'line']});
    // google.charts.setOnLoadCallback(this.drawDayGraphWithPredictive); // you cant have the parenthesis here
    google.charts.setOnLoadCallback(() => this.drawDayGraphWithoutPredictive(this.activeGym)); // you cant have the parenthesis here

  }

  drawDayGraphWithoutPredictive(activeGym: Gym) {


    let thePromise = activeGym.getPopulationData()[0][Number(activeGym.cameras[0].getCameraID())];

    //thePromise.then(function(data, this) { return this.createChart(data, this); });
    thePromise.then(this.createChart.bind(null, this));

  }



 createChart(componentReference, value) {
      const data = new google.visualization.DataTable();

      data.addColumn('datetime', 'Time');
      data.addColumn('number', 'Number Of People');

      let cameraData = value;
      let cameraProcessedData = [];
      for (let i = 0; i < cameraData.length; i++) {
        cameraProcessedData.push([new Date(cameraData[i].time), cameraData[i].population]);
        componentReference.numberOfPeople = cameraData[i].population;
      }


      data.addRows(cameraProcessedData);

      const options = {
        chartArea: {width: '70%' , height: '70%'},
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Number Of People',

        }
      };

      const chart = new google.visualization.LineChart(document.getElementById('day_populations_chart'));
      chart.draw(data, options);
  }

  drawDayGraphWithPredictive() {

    //let model = tf.keras.Sequential()
  }


}
