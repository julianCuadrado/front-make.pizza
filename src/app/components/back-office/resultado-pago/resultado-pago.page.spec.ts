import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadoPagoPage } from './resultado-pago.page';

describe('ResultadoPagoPage', () => {
  let component: ResultadoPagoPage;
  let fixture: ComponentFixture<ResultadoPagoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResultadoPagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
