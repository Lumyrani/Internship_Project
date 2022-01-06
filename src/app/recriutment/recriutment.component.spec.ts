import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecriutmentComponent } from './recriutment.component';

describe('RecriutmentComponent', () => {
  let component: RecriutmentComponent;
  let fixture: ComponentFixture<RecriutmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecriutmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecriutmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
