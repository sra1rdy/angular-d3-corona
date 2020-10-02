import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeInNewCasesComponent } from './de-in-new-cases.component';

describe('DeInNewCasesComponent', () => {
  let component: DeInNewCasesComponent;
  let fixture: ComponentFixture<DeInNewCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeInNewCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeInNewCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
