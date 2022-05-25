import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMiniComponent } from './post-mini.component';

describe('PostMiniComponent', () => {
  let component: PostMiniComponent;
  let fixture: ComponentFixture<PostMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostMiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
