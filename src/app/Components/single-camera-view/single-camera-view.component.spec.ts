import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCameraViewComponent } from './single-camera-view.component';

describe('SingleCameraViewComponent', () => {
  let component: SingleCameraViewComponent;
  let fixture: ComponentFixture<SingleCameraViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCameraViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCameraViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
