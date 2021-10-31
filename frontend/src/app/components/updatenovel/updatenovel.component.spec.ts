import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatenovelComponent } from './updatenovel.component';

describe('UpdatenovelComponent', () => {
  let component: UpdatenovelComponent;
  let fixture: ComponentFixture<UpdatenovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatenovelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatenovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
