import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScinanieComponent } from './scinanie.component';

describe('ScinanieComponent', () => {
  let component: ScinanieComponent;
  let fixture: ComponentFixture<ScinanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScinanieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScinanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
