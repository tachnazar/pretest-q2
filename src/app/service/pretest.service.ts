import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PretestService{

  constructor(private http: HttpClient) {}
  loadData(): Observable<any> {
    return this.http.get<any>("https://api.publicapis.org/categories");
  }
}