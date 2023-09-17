import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AuthService} from "../service/auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit{
  empForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) {
    this.empForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      dob: this.fb.control('', Validators.required),
      gender: this.fb.control('', Validators.required),
      department: this.fb.control('', Validators.required),
      experience: this.fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.service
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this.dialogRef.close(true);
              this.toastr.success('Employee detail updated!');
            },
            error: (err: any) => {
              console.error(err);
              this.toastr.error('Failed to update Employee details!');
            },
          });
      } else {
        this.service.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Employee added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
