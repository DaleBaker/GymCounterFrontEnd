import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCameraViewComponent } from './multi-camera-view.component';

describe('MultiCameraViewComponent', () => {
  let component: MultiCameraViewComponent;
  let fixture: ComponentFixture<MultiCameraViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiCameraViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCameraViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
