import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import {EmpAddEditComponent} from "../emp-add-edit/emp-add-edit.component";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  constructor(
    private service: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog) {

    this.SetAccesspermission();

  }
  employeelist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  accessdata: any;
  haveedit = false;
  haveadd = false;
  havedelete = false;

  ngAfterViewInit(): void {

  }
  LoadEmployee() {
    this.service.GetAllEmployee().subscribe(res => {
      this.employeelist = res;
      this.dataSource = new MatTableDataSource(this.employeelist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  SetAccesspermission() {
    this.service.Getaccessbyrole(this.service.getrole(), 'employee').subscribe(res => {
      this.accessdata = res;
      //console.log(this.accessdata);

      if(this.accessdata.length>0){
        this.haveadd=this.accessdata[0].haveadd;
        this.haveedit=this.accessdata[0].haveedit;
        this.havedelete=this.accessdata[0].havedelete;
        this.LoadEmployee();
      }else{
        alert('you are not authorized to access.');
        this.router.navigate(['']);
      }

    });
  }
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'department',
    'experience',
    'action'
  ];

  addEmployee() {
    const dialogRef = this.dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.LoadEmployee();
        }
      },
    });
  }

  updateEmployee(data: any) {
    if(this.haveedit){
      const dialogRef = this.dialog.open(EmpAddEditComponent, {
        data,
      });
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.LoadEmployee();
          }
        },
      });
    }else{
      this.toastr.warning("You don't have access for Edit")
    }

  }
  removeEmployee(id: any) {
    if(this.havedelete){
      this.service.deleteEmployee(id).subscribe({
        next: (res) => {
          this.toastr.success('Employee deleted!', 'Done');
          this.LoadEmployee();
        },
        error: this.toastr.error,
      });
    }else{
      this.toastr.warning("You don't have access for Delete")
    }
  }

}
