import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderDesktopComponent } from './slider-desktop.component';

describe('SliderDesktopComponent', () => {
  let component: SliderDesktopComponent;
  let fixture: ComponentFixture<SliderDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
