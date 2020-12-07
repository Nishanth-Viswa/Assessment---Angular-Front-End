import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }
  // baseURL:string = "http://localhost:3000/api";
  baseURL: string = "http://localhost:30005/api/service";
  get(path) {
    return this.http.get(
      this.baseURL + '/' + path,
      {
        headers: {
          "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDcyNzg4MTAsImV4cCI6MTYwNzMwNzYxMH0.6Hs4zKYqSBrVVz5hbW4DRlO3dlBSPtMKRt6b5Le3mrg'
        }
      }
    );
  }
}
