import { NgModule, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { App } from './app';
import { AppModule } from './app-module';
import { serverRoutes } from './app.routes.server';
import {DashboardModule} from './features/dashboard/dashboard-module';
import {Dashboard} from './features/dashboard/dashboard';
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  imports: [
    AppModule
  ],
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideZoneChangeDetection({ eventCoalescing: true })
    ],
  bootstrap: [App],
})
export class AppServerModule {}
