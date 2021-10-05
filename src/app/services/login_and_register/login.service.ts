import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginUserDTO, RegisterResponse } from "src/app/models/models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  constructor(private http: HttpClient) { }
  
  login(user: LoginUserDTO): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>('/api/usersRoute/login', user);
  }
}