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

  appsByStatus: { name: string; value: number }[] = [];

  view: [number, number] = [380, 300];
  gradient = false;
  showLabels = true;

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  private loadApplications(): void {
    this.isLoading = true;
    this.error = undefined;

    this.applicationService.findAll().subscribe({
      next: (apps) => {
        this.applications = (apps ?? []).map(a => ({
          ...a,
          progress: this.computeProgress(a)
        }));
        this.appsByStatus = this.buildStatusChart(this.applications);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load applications', err);
        this.error = 'Failed to load applications';
        this.isLoading = false;
      }
    });
  }

  private buildStatusChart(apps: Application[]): { name: string; value: number }[] {
    const counts = new Map<string, number>();
    for (const a of apps) {
      const key = a.status ?? 'UNKNOWN';
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    const labels: Record<string, string> = {
      PENDING: 'Pending',
      INTERVIEW: 'Interview',
      ACCEPTED: 'Accepted',
      REJECTED: 'Rejected',
      UNKNOWN: 'Unknown'
    };

    return Array.from(counts.entries()).map(([status, value]) => ({
      name: labels[status] ?? status,
      value
    }));
  }

  onDelete(app: Application) {
    if (!app.id) return;

    const yes = confirm(`Delete application for "${app.jobTitle ?? ''}" at "${app.company ?? ''}"?`);
    if (!yes) return;
    this.error = undefined;

    this.applicationService.delete(app.id).subscribe({
      next: () => {
        // this.applications = this.applications.filter(a => a.id !== app.id);
        this.loadApplications();
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.error = 'Failed to delete application';
      }
    });
  }

  private computeProgress(app: Application): number {
    switch (app.status) {
      case 'PENDING':   return 25;
      case 'INTERVIEW': return 75;
      case 'ACCEPTED':  return 100;
      case 'REJECTED':  return 50;
      default:          return 0;
    }
  }

  public progressBarColor(app: Application): string {
    switch (app.status) {
      case 'PENDING':   return 'bg-secondary bg-gradient';
      case 'INTERVIEW': return 'bg-warning bg-gradient';
      case 'ACCEPTED':  return 'bg-success bg-gradient';
      case 'REJECTED':  return 'bg-danger bg-gradient';
      default:          return 'bg-light-subtle';
    }
  }

}
