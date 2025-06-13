import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDashboardDetailAbsenceComponent } from './page-dashboard-detail-absence.component';

describe('PageDashboardDetailAbsenceComponent', () => {
  let component: PageDashboardDetailAbsenceComponent;
  let fixture: ComponentFixture<PageDashboardDetailAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDashboardDetailAbsenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDashboardDetailAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
