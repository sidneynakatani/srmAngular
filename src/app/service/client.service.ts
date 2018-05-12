
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CONFIG } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../model/cliente';
import { Response } from '@angular/http';

@Injectable()
export class ClientService {
   baseURL: string = CONFIG.apiURL;


  constructor(private http: HttpClient) {

  }

  public getAll<T>(): Observable<T> {
    return this.http.get<T>(this.baseURL + '/all');
  }


  add(cliente: Cliente): void {

    this.http.post(this.baseURL, cliente).subscribe();

  }
}
