import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcommentComponent } from './showcomment.component';

describe('ShowcommentComponent', () => {
  let component: ShowcommentComponent;
  let fixture: ComponentFixture<ShowcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
