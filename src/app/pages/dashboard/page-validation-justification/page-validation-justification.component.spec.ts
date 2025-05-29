import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageValidationJustificationComponent } from './page-validation-justification.component';

describe('PageValidationJustificationComponent', () => {
  let component: PageValidationJustificationComponent;
  let fixture: ComponentFixture<PageValidationJustificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageValidationJustificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageValidationJustificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
