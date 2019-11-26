import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  // tslint:disable-next-line: no-input-rename
  @Input('labels')  doughnutChartLabels: Label[] = [];
  // tslint:disable-next-line: no-input-rename
  @Input('data')  doughnutChartData: MultiDataSet = [];
  // tslint:disable-next-line: no-input-rename
  @Input('chartType')  doughnutChartType: ChartType;

  constructor() { }

  ngOnInit() {
  }

}
