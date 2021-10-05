import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormsService } from 'src/app/services/forms/forms.service';
import { AuthService } from 'src/app/services/login_and_register/auth.service';
import { LoginService } from 'src/app/services/login_and_register/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide=true;

  loginForm: FormGroup = this.formsService.loginForm;

  constructor(private formsService: FormsService, private loginService: LoginService,
     private authService: AuthService) { }

  onSubmit(){
    this.loginService.login(this.loginForm.value).subscribe(
      (response) => {
        if(response.succes === true)
          this.authService.setLocalStorage(response); //putting the token in the local storage
        console.log(response);
      },
      error => console.log(error)
    );
  }

}
