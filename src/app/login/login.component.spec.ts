import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {ToastrModule} from "ngx-toastr";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "../service/auth.service";
import {HttpClient} from "@angular/common/http";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;
  let httpclient: HttpClient;
  let httptestControl: HttpTestingController;

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
      declarations: [LoginComponent],
      providers: [AuthService]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(AuthService);
    httptestControl = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test', () => {
    expect(true).toBe(true);
  });

  it('UserName valid check', () => {
    let id = component.loginform.controls['id'];
    expect(id.valid).toBeFalsy();
    expect(id.errors).toBeTruthy();
  });

  it('Set UserName check', () => {
    let id = component.loginform.controls['id'];
    id.setValue('ankit.choudhary');
    expect(id.valid).toBeTruthy();
    expect(id.errors).toBeFalsy();
    expect(id.value).toEqual('ankit.choudhary');
  });

  it('Password valid check', () => {
    let password = component.loginform.controls['password'];
    expect(password.valid).toBeFalsy();
    expect(password.errors).toBeTruthy();
  });

  it('Set Password check', () => {
    let password = component.loginform.controls['password'];
    password.setValue('Test@1234');
    expect(password.valid).toBeTruthy();
    expect(password.errors).toBeFalsy();
    expect(password.value).toEqual('Test@1234');
  });
});
