import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { appUrl } from 'src/app/app.component';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http: HttpClient
  ) { }

  // 测试
  test(){
    return this.http.get(appUrl + "test/test")
    .pipe(
      tap(_ => console.log(_)),
      catchError(null)
    ); 
  }

}
