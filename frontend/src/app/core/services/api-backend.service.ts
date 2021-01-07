import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oil, OilInput, Power, Water } from './typings/api-backend';

@Injectable({
  providedIn: 'root'
})
export class ApiBackendService {
  private readonly baseURI = 'http://localhost:3000/api/';
  constructor(private readonly http: HttpClient) { }

  getOil(): Observable<Oil[]> {
    return this.http.get<Oil[]>(`${this.baseURI}oil`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  getPower(): Observable<Power[]> {
    return this.http.get<Power[]>(`${this.baseURI}power`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  getWater(): Observable<Water[]> {
    return this.http.get<Water[]>(`${this.baseURI}water`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  postOil(oil: OilInput): Observable<Oil> {
    return this.http.post<Oil>('http://localhost:3000/api/oil', oil, {
      observe: 'body',
      responseType: 'json',
    });
  }

}
