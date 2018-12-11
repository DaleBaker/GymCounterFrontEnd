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
    	cameraPromise.then(this.createChart.bind(null, this, x));
	}
  }

 createChart(componentReference, cameraId, value) {
      const data = new google.visualization.DataTable();

      data.addColumn('datetime', 'Time');
      data.addColumn('number', 'Number Of People');

      let cameraData = value;
      let cameraProcessedData = [];
      for (let i = 0; i < cameraData.length; i++) {
        cameraProcessedData.push([new Date(cameraData[i].time), cameraData[i].population]);
        componentReference.currentCameraPopulations[cameraId] = cameraData[i].population;
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

      const chart = new google.visualization.LineChart(document.getElementById("chartContainer" + cameraId));
      chart.draw(data, options);
  }
}

/*
	createChart(componentReference, cameraId, value) {

		let cameraProcessedData = [];
		for (let i = 0; i < value.length ; i ++) {


	      cameraProcessedData.push({x: new Date(value[i].time), y: value[i].population});
	      //this.numberOfPeople = cameraData[i].population;
	  }
	    
	    let chart = new CanvasJS.Chart("chartContainer" + cameraId, {
			animationEnabled: true,
			title:{
				text: "Website Traffic"
			},
			axisX:{
				valueFormatString: "DD MMM"
			},
			axisY: {
				title: "Number of Visitors",
				includeZero: false,
				scaleBreaks: {
					autoCalculate: true
				}
			},
			data: [{
				type: "line",
				xValueFormatString: "DDD HH:mm:ss",
				color: "#F08080",
				dataPoints: cameraProcessedData
			}]
		});
			
		chart.render();
		
	}
}*/
