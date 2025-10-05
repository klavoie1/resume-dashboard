import { Component, OnInit } from '@angular/core';
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

  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
      this.applicationService.findAll().subscribe((data: Application[]) =>
        this.applications = data);
    }

}
