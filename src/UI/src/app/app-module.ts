import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { DashboardModule } from './features/dashboard/dashboard-module';
import { DashboardRoutingModule } from './features/dashboard/dashboard-routing-module';
import { RouterLink, RouterOutlet } from "@angular/router";

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    DashboardRoutingModule,
    RouterLink,
    RouterOutlet
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withFetch())
  ],
  bootstrap: [App]
})
export class AppModule { }
