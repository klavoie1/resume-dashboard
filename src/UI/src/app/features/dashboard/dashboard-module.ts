import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard';
import {AppModule} from '../../app-module';
import {ApplicationList} from '../application-list/application-list';


@NgModule({
  declarations: [
    Dashboard,
    ApplicationList,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AppModule
  ]
})
export class DashboardModule { }
