import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderStoriesComponent } from './slider-stories.component';

describe('SliderStoriesComponent', () => {
  let component: SliderStoriesComponent;
  let fixture: ComponentFixture<SliderStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderStoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
