import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSesionComponent } from './design-sesion.component';

describe('DesignSesionComponent', () => {
  let component: DesignSesionComponent;
  let fixture: ComponentFixture<DesignSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
