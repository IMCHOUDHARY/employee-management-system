import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {

  }
  //apiurl='http://localhost:3000/user';
  userUrl = 'https://json-server-rtb.onrender.com/' + 'user';
  roleUrl = 'https://json-server-rtb.onrender.com/' + 'role';
  menuUrl = 'https://json-server-rtb.onrender.com/' + 'menu';
  roleaccessUrl = 'https://json-server-rtb.onrender.com/' + 'roleaccess';
  employeesUrl = 'https://json-server-rtb.onrender.com/' + 'employees';

  RegisterUser(inputdata:any){
    return this.http.post(this.userUrl,inputdata)
  }
  GetUserbyCode(id:any){
    return this.http.get(this.userUrl+'/'+id);
  }
  Getall(){
    return this.http.get(this.userUrl);
  }
  updateuser(id:any,inputdata:any){
    return this.http.put(this.userUrl+'/'+id,inputdata);
  }
  getuserrole(){
    return this.http.get(this.roleUrl);
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  GetAllEmployee(){
    return this.http.get(this.employeesUrl);
  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.employeesUrl + id);
  }

  addEmployee(inputdata:any){
    return this.http.post(this.employeesUrl,inputdata)
  }

  updateEmployee(id:any,inputdata:any){
    return this.http.put(this.employeesUrl +id,inputdata);
  }
  Getaccessbyrole(role:any,menu:any){
    return this.http.get(this.employeesUrl+ '?role=' +role+'&menu='+menu)
  }
}
