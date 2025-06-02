import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDashboardJustificationComponent } from './page-dashboard-justification.component';

describe('PageDashboardJustificationComponent', () => {
  let component: PageDashboardJustificationComponent;
  let fixture: ComponentFixture<PageDashboardJustificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDashboardJustificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDashboardJustificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
