import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {ToastrModule} from "ngx-toastr";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

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
        MatPaginatorModule,
        MatTableModule],
      declarations: [UserComponent]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the table ', (done) => {
    const testUsers: any[] = [
      {username: 'ankit', name: 'Impetus', email: 'test@gmail.com', status: 'Active', role: 'admin', action: 'edit'},
      {username: 'ankita', name: 'Gathr', email: 'test@yahoo.com', status: 'Active', role: 'admin', action: 'edit'}
    ];
    expect(testUsers).toEqual(testUsers);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(2);

      // Header row
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe('Username');
      expect(headerRow.cells[1].innerHTML).toBe('Name');
      expect(headerRow.cells[2].innerHTML).toBe('Email');
      expect(headerRow.cells[3].innerHTML).toBe('Status');
      expect(headerRow.cells[4].innerHTML).toBe('Role');
      expect(headerRow.cells[5].innerHTML).toBe('Action');

      // Data rows
      let row1 = tableRows[1];
      expect(row1.cells[0].innerHTML).toBe('ankit');
      expect(row1.cells[1].innerHTML).toBe('Impetus');
      expect(row1.cells[2].innerHTML).toBe('test@gmail.com');
      expect(row1.cells[0].innerHTML).toBe('admin');
      expect(row1.cells[1].innerHTML).toBe('edit');
      expect(row1.cells[2].innerHTML).toBe('test@gmail.com');

      // Test more rows here..

      done();
    });
  });
});
