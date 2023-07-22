import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatedResultsComponent } from './calculated-results.component';

describe('CalculatedResultsComponent', () => {
  let component: CalculatedResultsComponent;
  let fixture: ComponentFixture<CalculatedResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatedResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatedResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
