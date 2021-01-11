import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oil, OilInput, Power, PowerInput, Water, WaterInput } from './classes/api-backend';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiBackendService {
  private readonly baseURI = `${environment.backendURI}api/`;
  private readonly oilURI = `${this.baseURI}oil`;
  private readonly powerURI = `${this.baseURI}power`;
  private readonly waterURI = `${this.baseURI}water`;
  constructor(private readonly http: HttpClient) { }

  getOil(): Observable<Oil[]> {
    return this.http.get<Oil[]>(this.oilURI, {
      observe: 'body',
      responseType: 'json',
    });
  }

  getPower(): Observable<Power[]> {
    return this.http.get<Power[]>(this.powerURI, {
      observe: 'body',
      responseType: 'json',
    });
  }

  getWater(): Observable<Water[]> {
    return this.http.get<Water[]>(this.waterURI, {
      observe: 'body',
      responseType: 'json',
    });
  }

  postOil(oil: OilInput): Observable<Oil> {
    return this.http.post<Oil>(this.oilURI, oil, {
      observe: 'body',
      responseType: 'json',
    });
  }

  postWater(water: WaterInput): Observable<Water> {
    return this.http.post<Water>(this.waterURI, water, {
      observe: 'body',
      responseType: 'json'
    });
  }

  postPower(power: PowerInput): Observable<Power> {
    return this.http.post<Power>(this.powerURI, power, {
      observe: 'body',
      responseType: 'json'
    });
  }
}
