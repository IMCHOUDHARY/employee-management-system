import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
              private router: Router) {
    sessionStorage.clear();
  }
  result: any;

  securityquestion: string = '';

  forgotpasswordform = this.builder.group({
    id: this.builder.control('', Validators.required),
    securityquestion: this.builder.control({value: '', disabled: true}),
    securityanswer: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  getSecurityQuestion(id: any) {
    console.log('The Id is: ' + id.value);
    this.service.GetUserbyCode(id.value).subscribe(item => {
      this.result = item;
      this.securityquestion = this.result.securityquestion;
    }, error => {
      this.toastr.error('Username not present with us!!!!');
    })
  }

  proceedForgotPassword() {
    if(this.forgotpasswordform.valid) {
      this.service.GetUserbyCode(this.forgotpasswordform.value.id).subscribe(item=> {
          this.result = item;
          if(this.result.securityanswer === this.forgotpasswordform.value.securityanswer) {
            this.result.password = this.forgotpasswordform.value.password;
            this.service.updateuser(this.forgotpasswordform.value.id, this.result).subscribe({
              next: (val: any) => {
                this.toastr.success('User password updated!');
              },
              error: (err: any) => {
                console.error(err);
                this.toastr.error('Failed to update User password!');
              },
            });
          }
          else {
            this.toastr.error('Answer passed for the security question is not correct!!!!');
          }
        },
        error => {
          console.error(error);
          this.toastr.error('User not found with passed id!');
        });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}
