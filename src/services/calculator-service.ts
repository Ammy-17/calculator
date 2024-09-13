import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOperationModel } from '../models/operation-model';
import { Observable } from 'rxjs';
import { IAppResponseModel } from '../models/app-response-model';

/**
 * Servicio para consumir el controlador de calculadora.
 */
@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private readonly _url = "https://localhost:7134/api/calculator/";

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public sum(operation: IOperationModel): Observable<IAppResponseModel<number>> {
    const url: string = `${this._url}sum`;
    return this._httpClient.post<IAppResponseModel<number>>(url, operation);
  }

  public substract(operation: IOperationModel): Observable<IAppResponseModel<number>> {
    const url: string = `${this._url}substract`;
    return this._httpClient.post<IAppResponseModel<number>>(url, operation);
  }

  public divide(operation: IOperationModel): Observable<IAppResponseModel<number>> {
    const url: string = `${this._url}divide`;
    return this._httpClient.post<IAppResponseModel<number>>(url, operation);
  }

  public multiply(operation: IOperationModel): Observable<IAppResponseModel<number>> {
    const url: string = `${this._url}multiply`;
    return this._httpClient.post<IAppResponseModel<number>>(url, operation);
  }

}
