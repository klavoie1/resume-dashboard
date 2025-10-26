import { Component } from '@angular/core';
import { Application } from '../../core/models/application';
import { ApplicationService } from '../../core/services/application-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-application',
  standalone: false,
  templateUrl: './edit-application.html',
  styleUrl: './edit-application.css'
})
export class EditApplication {
  application: Application = {
    jobTitle: '',
    company: '',
    status: 'PENDING',
    submissionDate: ''
  };

  isSubmitting = false;
  isLoading = false;
  error?: string;

  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loadApplication();
  }

  private loadApplication() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;

    if (!id || Number.isNaN(id)) {
      this.error = 'Invalid application id';
      return;
    }

    this.isLoading = true;
    this.applicationService.get(id).subscribe({
      next: (app) => {
        this.application = app;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load application';
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    this.error = undefined;
    this.isSubmitting = true;
    if (this.application.id != null) {
      this.applicationService.update(this.application.id, this.application).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.error = 'Failed to edit application';
          console.error(err);
        }
      });
    }
  }

  onDelete() {
    if (!this.application.id) return;
    const yes = confirm('Are you sure you want to delete this application?\n' +
      'This action cannot be undone.');
    if (!yes) return;
    this.error = undefined;

    this.isSubmitting = true;
    this.applicationService.delete(this.application.id).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        this.isSubmitting = false;
        this.error = 'Failed to delete application';
        console.error(err);
      }
    });
  }
}
