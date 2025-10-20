import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../../core/services/application-service';
import { Application } from '../../core/models/application';

@Component({
  selector: 'app-add-application',
  standalone: false,
  templateUrl: './add-application.html',
  styleUrl: './add-application.css'
})
export class AddApplication {
  application: Application = {
    jobTitle: '',
    company: '',
    status: 'PENDING',
    submissionDate: ''
  };
  isSubmitting = false;
  error?: string;

  constructor(private applicationService: ApplicationService, private router: Router) {}

  onSubmit() {
    this.error = undefined;
    this.isSubmitting = true;
    this.applicationService.save(this.application).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard']); // Navigates back to the Dashboard view, could change to success message
      },
      error: (err) => {
        this.isSubmitting = false;
        this.error = 'Failed to save application';
        console.error(err);
      }
    });
  }
  protected readonly Router = Router;
}
