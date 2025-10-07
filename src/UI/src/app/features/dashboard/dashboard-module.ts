import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard';
import {AppModule} from '../../app-module';
import {ApplicationList} from '../application-list/application-list';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import {DashboardChart} from '../dashboard-chart/dashboard-chart';


@NgModule({
  declarations: [
    Dashboard,
    ApplicationList,
    DashboardChart
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AppModule,
    BrowserAnimationsModule,
    NgxChartsModule,
  ]
})
export class DashboardModule { }
