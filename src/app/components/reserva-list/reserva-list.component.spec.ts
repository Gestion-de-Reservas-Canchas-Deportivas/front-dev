import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaListComponent } from './reserva-list.component';

describe('ReservaListComponent', () => {
  let component: ReservaListComponent;
  let fixture: ComponentFixture<ReservaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaListComponent]
    });
    fixture = TestBed.createComponent(ReservaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
