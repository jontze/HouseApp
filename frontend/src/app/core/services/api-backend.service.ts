import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Oil,
  OilInput,
  Power,
  PowerInput,
  Water,
  WaterInput,
} from './classes/api-backend';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiBackendService {
  private readonly baseURI = `${environment.backendURI}api/`;
  private readonly oilURI = `${this.baseURI}oil/`;
  private readonly powerURI = `${this.baseURI}power/`;
  private readonly waterURI = `${this.baseURI}water/`;

  constructor(private readonly http: HttpClient) {}

  fetchWater(): Observable<Water[]> {
    return this.http.get<Water[]>(`${this.waterURI}`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  fetchPower(): Observable<Power[]> {
    return this.http.get<Power[]>(`${this.powerURI}`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  fetchOil(): Observable<Oil[]> {
    return this.http.get<Oil[]>(`${this.oilURI}`, {
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
      responseType: 'json',
    });
  }

  postPower(power: PowerInput): Observable<Power> {
    return this.http.post<Power>(this.powerURI, power, {
      observe: 'body',
      responseType: 'json',
    });
  }

  dropOilById(oilId: number): Observable<number> {
    return this.http
      .delete(`${this.oilURI}${oilId}`, { observe: 'response' })
      .pipe(map((response) => response.status));
  }

  dropWaterById(waterId: number): Observable<number> {
    return this.http
      .delete(`${this.waterURI}${waterId}`, { observe: 'response' })
      .pipe(map((response) => response.status));
  }

  dropPowerById(powerId: number): Observable<number> {
    return this.http
      .delete(`${this.powerURI}${powerId}`, { observe: 'response' })
      .pipe(map((response) => response.status));
  }

  getWaterById(waterId: number): Observable<Water> {
    return this.http.get<Water>(`${this.waterURI}${waterId}`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  getPowerById(powerId: number): Observable<Power> {
    return this.http.get<Power>(`${this.powerURI}${powerId}`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  getOilById(oilId: number): Observable<Oil> {
    return this.http.get<Oil>(`${this.oilURI}${oilId}`, {
      observe: 'body',
      responseType: 'json',
    });
  }

  updateWaterById(waterId: number, payload: WaterInput): Observable<Water> {
    return this.http.put<Water>(`${this.waterURI}${waterId}`, payload, {
      observe: 'body',
      responseType: 'json',
    });
  }

  updatePowerById(powerId: number, payload: PowerInput): Observable<Power> {
    return this.http.put<Power>(`${this.powerURI}${powerId}`, payload, {
      observe: 'body',
      responseType: 'json',
    });
  }

  updateOilById(oilId: number, payload: OilInput): Observable<Oil> {
    return this.http.put<Oil>(`${this.oilURI}${oilId}`, payload, {
      observe: 'body',
      responseType: 'json',
    });
  }
}
