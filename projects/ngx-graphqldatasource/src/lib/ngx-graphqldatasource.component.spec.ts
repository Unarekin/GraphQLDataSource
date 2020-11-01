import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxGraphqldatasourceComponent } from './ngx-graphqldatasource.component';

describe('NgxGraphqldatasourceComponent', () => {
  let component: NgxGraphqldatasourceComponent;
  let fixture: ComponentFixture<NgxGraphqldatasourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxGraphqldatasourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxGraphqldatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
