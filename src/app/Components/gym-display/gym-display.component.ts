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
    google.charts.setOnLoadCallback(this.drawGraph);

  }

  drawGraph() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'X');
    data.addColumn('number', 'People');

    data.addRows([['9:00', 2], ['10:00', 5], ['11:00', 7], ['12:00', 6], ['13:00', 2], ['14:00', 5]]);

    const options = {
      title: 'Today\'s gym population',
      chartArea: {width: '90%' , height: '90%'},
      hAxis: {
        title: 'Time',
        minValue: 0
      },
      vAxis: {
        title: 'Number Of People'
      }
    };

    const chart = new google.visualization.LineChart(document.getElementById('populations_chart'));
    chart.draw(data, options);
  }

}
