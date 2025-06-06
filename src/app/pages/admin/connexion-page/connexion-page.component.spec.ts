import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionPageComponent } from './connexion-page.component';

describe('ConnexionPageComponent', () => {
  let component: ConnexionPageComponent;
  let fixture: ComponentFixture<ConnexionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnexionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnexionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 