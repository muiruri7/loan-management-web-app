import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChartsComponent } from './my-charts.component';

describe('MyChartsComponent', () => {
  let component: MyChartsComponent;
  let fixture: ComponentFixture<MyChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyChartsComponent]
    });
    fixture = TestBed.createComponent(MyChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
