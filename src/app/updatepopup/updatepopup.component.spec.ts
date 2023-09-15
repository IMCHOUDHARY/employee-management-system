import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepopupComponent } from './updatepopup.component';
import {ToastrModule} from "ngx-toastr";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {forwardRef} from "@angular/core";

describe('UpdatepopupComponent', () => {
  let component: UpdatepopupComponent;
  let fixture: ComponentFixture<UpdatepopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(),
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatSelectModule],
      providers: [{
        provide: MatDialogRef,
        useValue: []
      },
        { provide: MAT_DIALOG_DATA, useValue: {} }],
      declarations: [UpdatepopupComponent]
    },);
    fixture = TestBed.createComponent(UpdatepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test check box', () => {
    let isactive = component.registerform.controls['isactive'];
    isactive.setValue(false);
    expect(isactive.valid).toBeTruthy();
    expect(isactive.errors).toBeFalsy();
    expect(isactive.value).toEqual(false);
  });
});
