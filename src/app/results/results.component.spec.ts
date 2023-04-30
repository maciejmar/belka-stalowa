// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ResultsComponent } from './results.component';

// describe('ResultsComponent', () => {
//   let component: ResultsComponent;
//   let fixture: ComponentFixture<ResultsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ResultsComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ResultsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ResultsComponent } from './results.component';
import { DataFormService } from '../data-form.service';
import { Results } from '../results';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let dataFormServiceSpy: jasmine.SpyObj<DataFormService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DataFormService', ['getResults']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ResultsComponent ],
      providers: [{ provide: DataFormService, useValue: spy }]
    })
    .compileComponents();

    dataFormServiceSpy = TestBed.inject(DataFormService) as jasmine.SpyObj<DataFormService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getAllResults', () => {
      spyOn(component, 'getAllResults');
      component.ngOnInit();
      expect(component.getAllResults).toHaveBeenCalled();
    });
  });

  describe('getAllResults', () => {
    it('should call getResults on dataFormService', () => {
      dataFormServiceSpy.getResults.and.returnValue(of([]));
      component.getAllResults();
      expect(dataFormServiceSpy.getResults).toHaveBeenCalled();
    });

    it('should set results property', () => {
      const expectedResults: Results[] = [
        { name: 'Result 1', userName: 'User 1' },
        { name: 'Result 2', userName: 'User 2' }
      ];
      dataFormServiceSpy.getResults.and.returnValue(of(expectedResults));
      component.getAllResults();
      expect(component.results).toEqual(expectedResults);
    });
  });
});
