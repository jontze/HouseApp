import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oil, OilInput, Power, PowerInput, Water, WaterInput } from './classes/api-backend';

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
    return this.http.post<Oil>(`${this.baseURI}oil`, oil, {
      observe: 'body',
      responseType: 'json',
    });
  }

  postWater(water: WaterInput): Observable<Water> {
    return this.http.post<Water>(`${this.baseURI}water`, water, {
      observe: 'body',
      responseType: 'json'
    });
  }

  postPower(power: PowerInput): Observable<Power> {
    return this.http.post<Power>(`${this.baseURI}power`, power, {
      observe: 'body',
      responseType: 'json'
    });
  }
}
