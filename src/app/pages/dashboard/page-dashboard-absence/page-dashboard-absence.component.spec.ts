import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDashboardAbsenceComponent } from './page-dashboard-absence.component';

describe('PageDashboardAbsenceComponent', () => {
  let component: PageDashboardAbsenceComponent;
  let fixture: ComponentFixture<PageDashboardAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDashboardAbsenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDashboardAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
