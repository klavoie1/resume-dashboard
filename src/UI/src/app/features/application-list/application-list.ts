import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.applicationService.findAll().subscribe(data => {
      this.applications = data;
      this.cdr.detectChanges(); // or this.cdr.markForCheck(); if OnPush
    });
  }
}
