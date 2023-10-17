import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsPageComponent } from './pets-page.component';

describe('PetsPageComponent', () => {
  let component: PetsPageComponent;
  let fixture: ComponentFixture<PetsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetsPageComponent]
    });
    fixture = TestBed.createComponent(PetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
