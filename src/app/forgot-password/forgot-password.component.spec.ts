import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import {ToastrModule} from "ngx-toastr";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(),
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule],
      declarations: [ForgotPasswordComponent]
    });
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('UserName valid check', () => {
    let id = component.forgotpasswordform.controls['id'];
    expect(id.valid).toBeFalsy();
    expect(id.errors).toBeTruthy();
  });

  it('Set UserName check', () => {
    let id = component.forgotpasswordform.controls['id'];
    id.setValue('ankit.choudhary');
    expect(id.valid).toBeTruthy();
    expect(id.errors).toBeFalsy();
    expect(id.value).toEqual('ankit.choudhary');
  });

  it('Password valid check', () => {
    let password = component.forgotpasswordform.controls['password'];
    expect(password.valid).toBeFalsy();
    expect(password.errors).toBeTruthy();
  });

  it('Set Password check', () => {
    let password = component.forgotpasswordform.controls['password'];
    password.setValue('Test@1234');
    expect(password.valid).toBeTruthy();
    expect(password.errors).toBeFalsy();
    expect(password.value).toEqual('Test@1234');
  });
});
