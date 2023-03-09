import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionImagesComponent } from './question-images.component';

describe('QuestionImagesComponent', () => {
  let component: QuestionImagesComponent;
  let fixture: ComponentFixture<QuestionImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
