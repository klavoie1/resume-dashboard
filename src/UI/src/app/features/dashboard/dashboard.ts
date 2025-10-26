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
  currentDate: Date = new Date();
  hasMonthData = false;
  hasYearData = false;

  appsByStatus: { name: string; value: number }[] = [];
  appsByMonth: { name: string; value: number }[] = [];
  appsByYear: { name: string; value: number }[] = [];

  view: [number, number] = [380, 300];
  gradient = false;
  showLabels = true;
  showGridLines = false;

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
        this.appsByMonth  = this.buildLastTwoMonthsBarChart(this.applications);
        this.appsByYear = this.buildYearSubmissions(this.applications);
        this.hasMonthData = this.appsByMonth.some(d => d.value > 0);
        this.hasYearData = this.appsByYear.some(d => d.value > 0);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load applications', err);
        this.error = 'Failed to load applications';
        this.isLoading = false;
      }
    });
  }

  public buildStatusChart(apps: Application[]): { name: string; value: number }[] {
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

  private getSubmittedDate(app: Application): Date | undefined {
    const raw = app.submissionDate ?? app.createdDate;
    if (!raw) return undefined;
    const d = new Date(raw);
    return isNaN(d.getTime()) ? undefined : d;
  }

  private formatMonthLabel(year: number, monthIndex0: number): string {
    const short = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${short[monthIndex0]} ${year}`;
  }

  public formatYearLabel(year: number): any {
    if (!year) return null;

    if (year === this.currentDate.getFullYear()) return `${year}`;
    if (year === this.currentDate.getFullYear() - 1) return `${year}`;

  }

  public buildLastTwoMonthsBarChart(apps: Application[]): { name: string; value: number }[] {
    const now = this.currentDate ?? new Date();

    const curYear = now.getFullYear();
    const curMon = now.getMonth();

    // Previous month with year rollover
    const prevMon = (curMon + 11) % 12;
    const prevYear = curMon === 0 ? curYear - 1 : curYear;

    let curCount = 0;
    let prevCount = 0;

    for (const a of apps) {
      const d = this.getSubmittedDate(a);
      if (!d) continue;
      const y = d.getFullYear();
      const m = d.getMonth();

      if (y === curYear && m === curMon) curCount++;
      else if (y === prevYear && m === prevMon) prevCount++;
    }

    return [
      { name: this.formatMonthLabel(prevYear, prevMon), value: prevCount },
      { name: this.formatMonthLabel(curYear, curMon), value: curCount }
    ];
  }

  public buildYearSubmissions(apps: Application[]): { name: string; value: number }[] {
    const now = this.currentDate ?? new Date();

    const curYear = now.getFullYear();
    const prevYear = curYear - 1;

    let curYearSubmission = 0;
    let prevYearSubmission = 0;

    for (const a of apps) {
      const d = this.getSubmittedDate(a);
      if (!d) continue;

      if (d.getFullYear() === curYear) {
        curYearSubmission++;
      } else if (d.getFullYear() === prevYear) {
        prevYearSubmission++;
      }
    }

    return [
      { name: this.formatYearLabel(prevYear), value: prevYearSubmission },
      { name: this.formatYearLabel(curYear), value: curYearSubmission }
    ]

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
