import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/application';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private readonly applicationUrl = 'http://localhost:8080/applications';

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Application[]> {
    return this.http.get<Application[]>(this.applicationUrl);
  }

  public get(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.applicationUrl}/${id}`);
  }

  public save(application: Application): Observable<Application> {
    return this.http.post<Application>(this.applicationUrl, application);
  }

  public update(id: number, application: Application): Observable<Application> {
    return this.http.put<Application>(`${this.applicationUrl}/${id}`, application);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.applicationUrl}/${id}`);
  }

  public findByCompany(company: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.applicationUrl}?company=${encodeURIComponent(company)}`);
  }
}
