import { NgModule, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { DashboardModule } from './features/dashboard/dashboard-module';
import { DashboardRoutingModule } from './features/dashboard/dashboard-routing-module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddApplication } from './features/add-application/add-application';

@NgModule({
  declarations: [
    App,
    AddApplication
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    DashboardRoutingModule,
    RouterLink,
    RouterOutlet,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true })
  ],
  bootstrap: [App]
})
export class AppModule {}
