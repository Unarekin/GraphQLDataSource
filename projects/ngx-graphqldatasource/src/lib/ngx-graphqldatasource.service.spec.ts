import { TestBed } from '@angular/core/testing';

import { NgxGraphqldatasourceService } from './ngx-graphqldatasource.service';

describe('NgxGraphqldatasourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxGraphqldatasourceService = TestBed.get(NgxGraphqldatasourceService);
    expect(service).toBeTruthy();
  });
});
