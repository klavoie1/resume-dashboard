export class Application {
  id?: number;
  jobTitle?: string;
  company?: string;
  status?: "UNKNOWN" | "PENDING" | "ACCEPTED" | "REJECTED" | "INTERVIEW";
  submissionDate?: string;
  progress?: number;
  createdDate?: string;
  updatedDate?: string;
}
