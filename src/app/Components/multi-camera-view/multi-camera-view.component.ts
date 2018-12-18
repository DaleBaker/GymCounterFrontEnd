import { Component, OnInit } from '@angular/core';
//import * as CanvasJS from './../../../assets/canvasjs.min';
import { Gym } from '../../../assets/Gym';
import { GymAddressesService } from '../../services/gym-addresses.service';
declare var google: any;

@Component({
  selector: 'app-multi-camera-view',
  templateUrl: './multi-camera-view.component.html',
  styleUrls: ['./multi-camera-view.component.css']
})
export class MultiCameraViewComponent implements OnInit {

   activeGym: Gym;
   numberOfPeople: Number;
   cameraPromises = [];

   cameraNames = [];
   currentCameraPopulations = [];

  constructor(private gymAddressesService: GymAddressesService) { }

  ngOnInit() {
  	this.gymAddressesService.activeGym.subscribe(activeGym => this.activeGym = activeGym);
  	google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(() => this.drawDayGraphWithoutPredictive(this.activeGym)); // you cant have the parenthesis here
}

  drawDayGraphWithoutPredictive(activeGym: Gym) {
    let cameras = this.activeGym.getPopulationData();
   	this.cameraPromises = [];
    for (let x = 0; x < cameras.length; x++) { 
    	let cameraPromise = cameras[x][Number(this.activeGym.cameras[x].getCameraID())];
    	this.cameraPromises.push(cameraPromise);
    	this.cameraNames.push(this.activeGym.cameras[x].getCameraName());
      if (x == 2) {
              cameraPromise.then(this.createChartWithPredictive.bind(null, this, x));

      } else {
    	cameraPromise.then(this.createChart.bind(null, this, x));
    }
	  }
  }

 createChart(componentReference, cameraId, value) {
      const data = new google.visualization.DataTable();

      data.addColumn('datetime', 'Time');
      data.addColumn('number', 'Number Of People');

      let cameraData = value;
      let cameraProcessedData = [];
            let lastDate;

      for (let i = 0; i < cameraData.length; i++) {
        cameraProcessedData.push([new Date(cameraData[i].time), cameraData[i].population]);
        componentReference.currentCameraPopulations[cameraId] = cameraData[i].population;
                lastDate = new Date(cameraData[i].time);

      }

      data.addRows(cameraProcessedData);

      const options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Number Of People',

        }, chartArea: {width: '70%'}

      };

      const chart = new google.visualization.LineChart(document.getElementById("chartContainer" + cameraId));
      chart.draw(data, options);
  }


   createChartWithPredictive(componentReference, cameraId, value) {
      const data = new google.visualization.DataTable();

      data.addColumn('datetime', 'Time');
      data.addColumn('number', 'Number Of People');
      data.addColumn('number', 'Predicted Number Of People');

      let cameraData = value;
      let cameraProcessedData = [];
      let lastDate;
      for (let i = 0; i < cameraData.length; i++) {
        let predictedNumber = Number(cameraData[i].population) + Number(Math.round(Math.random() * 8) - 4);
        if (predictedNumber < 0) {
          predictedNumber = 0;
        }
        cameraProcessedData.push([new Date(cameraData[i].time), cameraData[i].population, predictedNumber]);
        lastDate = new Date(cameraData[i].time);
        componentReference.currentCameraPopulations[cameraId] = cameraData[i].population;
      }

      let currentGymPopulation = componentReference.currentCameraPopulations[cameraId];

      for (let i = 0; i < 12; i++) {
        let predictedNumber = Number(cameraData[i].population) + Number(Math.round(Math.random() * 8) - 4);
        var newDateObj = new Date();
        newDateObj.setTime(lastDate.getTime() + (60 * 60 * 1000));
        lastDate = newDateObj;        
        var populationShift = Math.round(Math.random() * 20) - 10;
        currentGymPopulation += populationShift;

        //make sure population never drops below 0
        if (currentGymPopulation < 0) {
          currentGymPopulation = 0;
        }

        //make sure population doesnt get unrealistically high
        if (currentGymPopulation > 60) {
          currentGymPopulation -= 5;
        }
        var newDateObj2 = new Date();
        newDateObj2.setTime(lastDate.getTime() + (720 * 60 * 1000));
        var isoString = newDateObj2.toISOString().split("T");

       if (parseInt(isoString[1].substring(0, 2)) < 6 || parseInt(isoString[1].substring(0, 2)) > 22) {
        currentGymPopulation = 0;
      }

        cameraProcessedData.push([lastDate, null, currentGymPopulation]);

      }



      data.addRows(cameraProcessedData);

      const options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Number Of People',

          }, chartArea: {width: '70%'}
      };

      const chart = new google.visualization.LineChart(document.getElementById("chartContainer" + cameraId));
      chart.draw(data, options);
  }
}

