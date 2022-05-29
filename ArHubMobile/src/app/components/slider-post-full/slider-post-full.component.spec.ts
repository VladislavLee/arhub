import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderPostFullComponent } from './slider-post-full.component';

describe('SliderPostFullComponent', () => {
  let component: SliderPostFullComponent;
  let fixture: ComponentFixture<SliderPostFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderPostFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderPostFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
