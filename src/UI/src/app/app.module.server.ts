import { NgModule } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { App } from './app';
import { AppModule } from './app-module';
import { serverRoutes } from './app.routes.server';
import {DashboardModule} from './features/dashboard/dashboard-module';
import {Dashboard} from './features/dashboard/dashboard';

@NgModule({
  imports: [DashboardModule],
  providers: [provideServerRendering(withRoutes(serverRoutes))],
  bootstrap: [Dashboard],
})
export class AppServerModule {}
