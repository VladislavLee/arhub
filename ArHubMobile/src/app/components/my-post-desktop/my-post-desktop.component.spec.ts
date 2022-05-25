import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostDesktopComponent } from './my-post-desktop.component';

describe('MyPostDesktopComponent', () => {
  let component: MyPostDesktopComponent;
  let fixture: ComponentFixture<MyPostDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPostDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPostDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
