import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {  RegisterResponse, RegisterUserDTO } from "src/app/models/models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService{

  constructor(private http: HttpClient) { }
  
  enroll(user: RegisterUserDTO): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>('/api/usersRoute/register', user);
  }
}