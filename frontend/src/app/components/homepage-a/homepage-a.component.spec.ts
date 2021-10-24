import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageAComponent } from './homepage-a.component';

describe('HomepageAComponent', () => {
  let component: HomepageAComponent;
  let fixture: ComponentFixture<HomepageAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
