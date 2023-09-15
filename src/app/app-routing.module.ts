import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";

const routes: Routes = [
  {component:LoginComponent,path:'login'},
  {component:RegisterComponent,path:'register'},
  {component:ForgotPasswordComponent,path:'forgot-password'},
  {component:HomeComponent,path:'',canActivate:[AuthGuard]},
  {component:UserComponent,path:'user',canActivate:[AuthGuard]},
  {component:EmployeeComponent,path:'employee',canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
