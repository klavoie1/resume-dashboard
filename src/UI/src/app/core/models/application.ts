export class Application {
  id?: number;
  jobTitle?: string;
  company?: string;
  status?: "UNKNOWN" | "PENDING" | "ACCEPTED" | "REJECTED" | "IN_PROGRESS";
  submissionDate?: string;
  progress?: number;
  createdDate?: string;
  updatedDate?: string;
}
