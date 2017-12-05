import { Component, OnInit } from '@angular/core';
import { GymAddressesService } from '../../services/gym-addresses.service';
import { Gym } from '../../../assets/Gym';
declare var google: any;

@Component({
  selector: 'app-gym-display',
  templateUrl: './gym-display.component.html',
  styleUrls: ['./gym-display.component.css']
})

export class GymDisplayComponent implements OnInit {

  activeGym: Gym;

  constructor(private gymAddressesService: GymAddressesService) { }

  ngOnInit() {
    this.gymAddressesService.activeGym.subscribe(activeGym => this.activeGym = activeGym);
    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(this.drawGraphWithPredictive);

  }

  drawGraph() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'X');
    data.addColumn('number', 'Actual Number Of People People');

    data.addRows([['9:00', 2], ['10:00', 5], ['11:00', 7], ['12:00', 6], ['13:00', 2], ['14:00', 5]]);

    const options = {
      title: 'Today\'s gym population',
      chartArea: {width: '90%' , height: '90%'},
      hAxis: {
        title: 'Time'
      },
      vAxis: {
        title: 'Number Of People'
      }
    };

    const chart = new google.visualization.LineChart(document.getElementById('populations_chart'));
    chart.draw(data, options);
  }

  drawGraphWithPredictive() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'X');
    data.addColumn('number', 'Predicted Number Of People');
    data.addColumn('number', 'Actual Number Of People');

    // ['Time', 'Predicted Number Of People', 'Actual Number Of People'],

    data.addRows([ ['9:00', 2, 2],
        ['10:00', 5, 4], ['11:00', 7, 7], ['12:00', 6, 6], ['13:00', 4, null], ['14:00', 6, null]]);

    const options = {
      title: 'Today\'s gym population',
      chartArea: {width: '70%' , height: '90%'},
      hAxis: {
        title: 'Time'
      },
      vAxis: {
        title: 'Number Of People'
      }
    };

    const chart = new google.visualization.LineChart(document.getElementById('populations_chart'));
    chart.draw(data, options);
  }

}
