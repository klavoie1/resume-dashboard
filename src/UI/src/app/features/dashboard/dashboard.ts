import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import {Application} from '../../core/models/application';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  // Initial chart size
  view: [number, number] = [400, 300];

  applications: Application[] = [];

  getPieData(): any {
    pieData = [
    const accepted = this.applications.filter(a => a.status === "ACCEPTED").length;,
    const pending = this.applications.filter(a => a.status === "PENDING").length;,
    const rejected = this.applications.filter(a => a.status === "REJECTED").length;
    const interview = this.applications.filter(a => a.status === "INTERVIEW").length;
    const unknown = this.applications.filter(a => a.status === "UNKNOWN").length;

  ]
  }

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  setWidth(w: number) {
    const width = Math.max(100, Math.min(1200, Math.floor(w)));
    this.view = [width, this.view[1]]; // new array for change detection
  }

  setHeight(h: number) {
    const height = Math.max(100, Math.min(800, Math.floor(h)));
    this.view = [this.view[0], height]; // new array for change detection
  }

}
