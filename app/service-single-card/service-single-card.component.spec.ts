import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSingleCardComponent } from './service-single-card.component';

describe('ServiceSingleCardComponent', () => {
  let component: ServiceSingleCardComponent;
  let fixture: ComponentFixture<ServiceSingleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceSingleCardComponent]
    });
    fixture = TestBed.createComponent(ServiceSingleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
