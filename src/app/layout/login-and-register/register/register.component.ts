import { Component, OnInit } from '@angular/core';
import { LoginUserDTO, RegisterUserDTO } from 'src/app/models/models';
import { FormsService } from 'src/app/services/forms/forms.service';
import { AuthService } from 'src/app/services/login_and_register/auth.service';
import { EnrollmentService } from 'src/app/services/login_and_register/enrollment.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  hidePassword: boolean=true; hideConfirmedPassword: boolean=true; //For showing the passwords and hiding them

  registerForm = this.formsService.registerForm;

  constructor(private formsService: FormsService, private enrollmentService: EnrollmentService, private authService: AuthService) { }

  onSubmit(){
    this.enrollmentService.enroll(this.registerForm.value).subscribe(
      (response) => {
        if(response.succes === true)
          this.authService.setLocalStorage(response); //putting the token in the local storage
        console.log(response);
      },
      (error) => console.log(error)
    );
  }
}
