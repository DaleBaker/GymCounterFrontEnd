import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymDisplayComponent } from './gym-display.component';

describe('GymDisplayComponent', () => {
  let component: GymDisplayComponent;
  let fixture: ComponentFixture<GymDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
