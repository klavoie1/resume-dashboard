import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../core/services/application-service';
import { Application } from '../../core/models/application';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  applications: Application[] = [];
  isLoading = false;
  error?: string;

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  private loadApplications(): void {
    this.isLoading = true;
    this.error = undefined;

    this.applicationService.findAll().subscribe({
      next: (apps) => {
        this.applications = apps ?? [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load applications', err);
        this.error = 'Failed to load applications';
        this.isLoading = false;
      }
    });
  }

  // Optional: use with *ngFor if you prefer trackBy over @for
  trackById(_: number, app: Application) {
    return app.id ?? app;
  }
}
