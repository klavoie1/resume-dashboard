import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard';
import { ApplicationList } from '../application-list/application-list';
import { NgxChartsModule } from "@swimlane/ngx-charts";

@NgModule({
  declarations: [
    Dashboard,
    ApplicationList
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterLink,
    NgxChartsModule
  ]
})
export class DashboardModule { }
