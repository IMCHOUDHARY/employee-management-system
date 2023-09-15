import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('AuthService', () => {
  let service: AuthService;
  let httpclient: HttpClient;
  let httptestControl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httptestControl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('httpclient Get method', () => {
    const testUsers: any[] = [
      {id: 'ankit', name: 'Impetus', password: 'Test$1234',  email: 'test@gmail.com'},
      {id: 'ankita', name: 'Gathr', password: 'Test$1234',  email: 'test@yahoo.com'},
    ];

    service.Getall().subscribe((users:any)=>{
      expect(testUsers).toBe(users,'should check mocked data');
    })

    const req = httptestControl.expectOne(service.apiurl);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(testUsers);
    httptestControl.verify();
  })

  it('httpclient Post method', () => {
    const postUser: any =
      {id: 'ankit', name: 'Impetus', password: 'Test$1234',  email: 'test@gmail.com'};

    service.RegisterUser(postUser).subscribe((user:any)=>{
      expect(postUser).toBe(postUser);
    })

    const req = httptestControl.expectOne(service.apiurl);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(postUser);
    httptestControl.verify();
  })
});
