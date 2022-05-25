import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDesktopComponent } from './account-desktop.component';

describe('AccountDesktopComponent', () => {
  let component: AccountDesktopComponent;
  let fixture: ComponentFixture<AccountDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
