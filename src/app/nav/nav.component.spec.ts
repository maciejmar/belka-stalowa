// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { NavComponent } from './nav.component';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms'

// describe('NavComponent', () => {
//   let component: NavComponent;
//   let fixture: ComponentFixture<NavComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         HttpClientModule,
//         FormsModule,
//         ReactiveFormsModule],
//       declarations: [ NavComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NavComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav.component';
import { DataFormService } from '../data-form.service';
import { of } from 'rxjs';
import { Results } from '../results';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let dataFormService: DataFormService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule ],
      providers: [ DataFormService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    dataFormService = TestBed.inject(DataFormService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllResults() and populate results', () => {
    const results: Results[] = [{name: 'as', userName: 'sds'}];
    spyOn(dataFormService, 'getResults').and.returnValue(of(results));
    component.getAllResults();
    expect(component.results).toEqual(results);
  });

  it('should call onSubmitFormPyForm()', () => {
    spyOn(dataFormService, 'saveData').and.returnValue(of({name: 'as', userName: 'sds'}));
    component.result = {name: 'as', userName: 'sds'};
    component.onSubmitFormPyForm();
    expect(dataFormService.saveData).toHaveBeenCalledWith(component.result);
  });

  it('should call submitForm()', () => {
    spyOn(dataFormService, 'saveFormData').and.returnValue(of({}));
    component.steelForm.setValue({
      steelType: 'type',
      l0: '1',
      q: '2',
      qk: '3',
      M: '4',
      V: '5'
    });
    component.submitForm();
    expect(dataFormService.saveFormData).toHaveBeenCalledWith(component.steelForm.value);
  });
});
