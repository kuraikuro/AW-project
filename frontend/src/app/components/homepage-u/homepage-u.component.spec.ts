import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageUComponent } from './homepage-u.component';

describe('HomepageUComponent', () => {
  let component: HomepageUComponent;
  let fixture: ComponentFixture<HomepageUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageUComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
