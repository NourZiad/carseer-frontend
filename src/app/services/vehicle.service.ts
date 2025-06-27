import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private base = environment.apiUrl + '/vehicles';

  constructor(private http: HttpClient) {}

  getMakes(): Observable<any> {
    return this.http.get(`${this.base}/makes`);
  }

  getVehicleTypes(makeId: number): Observable<any> {
    return this.http.get(`${this.base}/vehicle-types/${makeId}`);
  }

  getModels(makeId: number, year: number): Observable<any> {
    return this.http.get(
      `${this.base}/models`,
      { params: { makeId, year } }
    );
  }
}

