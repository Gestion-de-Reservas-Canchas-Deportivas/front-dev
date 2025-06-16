import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtTypesComponent } from './court-types.component';

describe('CourtTypesComponent', () => {
  let component: CourtTypesComponent;
  let fixture: ComponentFixture<CourtTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourtTypesComponent]
    });
    fixture = TestBed.createComponent(CourtTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
