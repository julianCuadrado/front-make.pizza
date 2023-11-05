import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasarelaPaypalPage } from './pasarela-paypal.page';

describe('PasarelaPaypalPage', () => {
  let component: PasarelaPaypalPage;
  let fixture: ComponentFixture<PasarelaPaypalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PasarelaPaypalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
