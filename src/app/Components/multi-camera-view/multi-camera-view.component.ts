import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './../../../assets/canvasjs.min';
import { Gym } from '../../../assets/Gym';
import { GymAddressesService } from '../../services/gym-addresses.service';

@Component({
  selector: 'app-multi-camera-view',
  templateUrl: './multi-camera-view.component.html',
  styleUrls: ['./multi-camera-view.component.css']
})
export class MultiCameraViewComponent implements OnInit {

   activeGym: Gym;
   numberOfPeople: Number;

  constructor(private gymAddressesService: GymAddressesService) { }

  ngOnInit() {
  	this.gymAddressesService.activeGym.subscribe(activeGym => this.activeGym = activeGym);
    let cameras = this.activeGym.getPopulationData();
    let cameraProcessedData = [];
    console.log(cameras);
    for (let x = 0; x < cameras.length; x++) { 
    	let cameraData = cameras[x][Number(this.activeGym.cameras[x].getCameraID())];
    	cameraProcessedData.push([]);
	    for (let i = 0; i < cameraData.length; i++) {
	      cameraProcessedData[x].push({x: new Date(cameraData[i].time), y: cameraData[i].population});
	      this.numberOfPeople = cameraData[i].population;
	    }
	    let chart = new CanvasJS.Chart("chartContainer" + x, {
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
			dataPoints: cameraProcessedData[x]
		}]
	});
		
	chart.render();
    }
	}
  

}
