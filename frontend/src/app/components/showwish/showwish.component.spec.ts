import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowwishComponent } from './showwish.component';

describe('ShowwishComponent', () => {
  let component: ShowwishComponent;
  let fixture: ComponentFixture<ShowwishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowwishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowwishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
