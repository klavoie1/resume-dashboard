import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Application} from '../models/application';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private readonly applicationUrl: string;

  constructor(private http: HttpClient) {
    this.applicationUrl = "http://localhost:8080/applications";
  }

  public findAll(): Observable<Application[]> {
    return this.http.get<Application[]>(this.applicationUrl);
  }

  public save(application: Application) {
    return this.http.post<Application>(this.applicationUrl, application);
  }
}
