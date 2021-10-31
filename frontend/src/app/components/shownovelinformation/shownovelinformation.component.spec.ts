import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShownovelinformationComponent } from './shownovelinformation.component';

describe('ShownovelinformationComponent', () => {
  let component: ShownovelinformationComponent;
  let fixture: ComponentFixture<ShownovelinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShownovelinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShownovelinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
