import { TestBed, inject } from '@angular/core/testing';

import { GymAddressesService } from './gym-addresses.service';

describe('GymAddressesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GymAddressesService]
    });
  });

  it('should be created', inject([GymAddressesService], (service: GymAddressesService) => {
    expect(service).toBeTruthy();
  }));
});
