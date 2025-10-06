import {ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {Application} from '../../core/models/application';
import {ApplicationService} from '../../core/services/application-service';

@Component({
  selector: 'app-application-list',
  standalone: false,
  templateUrl: './application-list.html',
  styleUrl: './application-list.css'
})
export class ApplicationList implements OnInit{

  applications: Application[] = [];

  constructor(private applicationService: ApplicationService, private cdr: ChangeDetectorRef) {}

  @Input() status?: Application['status'];
  @Input() showRate = false;

  ngOnInit() {
    this.applicationService.findAll().subscribe(data => {
      this.applications = data;
      this.cdr.detectChanges(); // or this.cdr.markForCheck(); if OnPush
    });
  }

  get count(): number {
    return this.status
      ? this.applications.filter(a => a.status === this.status).length
      : this.applications.length;
  }

  get displayValue(): number {
    return this.showRate ? this.successRate : this.count;
  }

  get successRate(): number {
    const total = this.applications.length;
    if (total === 0) return 0;

    const accepted = this.applications.filter(a => a.status === "ACCEPTED").length;
    return (accepted / total) * 100;
  }
}
