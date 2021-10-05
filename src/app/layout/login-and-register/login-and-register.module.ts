import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginAndRegisterComponent } from './login-and-register.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonToggleModule} from '@angular/material/button-toggle'


@NgModule({
  declarations: [LoginAndRegisterComponent,LoginComponent,RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path:'',
        component: LoginAndRegisterComponent,
        children: [{
          path:'',
          pathMatch: 'full',
          redirectTo:'login'
        },
        {
          path:'login',
          component: LoginComponent,
        },
        {
          path:'register',
          component: RegisterComponent,
        }
        ]
      }
    ])
  ]
})
export class LoginAndRegisterModule { }
