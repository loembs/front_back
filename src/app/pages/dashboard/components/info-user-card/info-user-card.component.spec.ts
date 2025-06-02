import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUserCardComponent } from './info-user-card.component';

describe('InfoUserCardComponent', () => {
  let component: InfoUserCardComponent;
  let fixture: ComponentFixture<InfoUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoUserCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
