import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard-chart',
  standalone: false,
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <ng-container [ngSwitch]="type">
          <ngx-charts-pie-chart *ngSwitchCase="'pie'"
                                [view]="view"
                                [results]="data"
                                [scheme]="scheme"
                                [labels]="labels"
                                [legend]="legend">
          </ngx-charts-pie-chart>
        </ng-container>
      </div>
    </div>
  `,
  styleUrl: './dashboard-chart.css',
})
export class DashboardChart {
  @Input() title = '';
  @Input() type: 'pie' | 'bar' | 'line' = 'pie';
  @Input() data: any[] = [];
  @Input() scheme: Color | string = 'vivid'; // allow string or Color
  @Input() labels = true;
  @Input() legend = true;


  // Accept width/height from parent
  @Input() view: [number, number] = [400, 300];
}
