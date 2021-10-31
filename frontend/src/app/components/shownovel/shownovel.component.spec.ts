import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShownovelComponent } from './shownovel.component';

describe('ShownovelComponent', () => {
  let component: ShownovelComponent;
  let fixture: ComponentFixture<ShownovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShownovelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShownovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
