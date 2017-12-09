import {Component, OnInit} from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.css']
})


export class WeekViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }


  drawWeekGraphWithPredictive() {
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

    const chart = new google.visualization.LineChart(document.getElementById('week_populations_chart'));
    chart.draw(data, options);
  }

}
