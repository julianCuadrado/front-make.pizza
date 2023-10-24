import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackOfficePage } from './back-office.page';

describe('BackOfficePage', () => {
  let component: BackOfficePage;
  let fixture: ComponentFixture<BackOfficePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BackOfficePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
