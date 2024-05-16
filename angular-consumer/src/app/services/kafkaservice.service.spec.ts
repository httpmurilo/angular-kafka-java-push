/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KafkaserviceService } from './kafkaservice.service';

describe('Service: Kafkaservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KafkaserviceService]
    });
  });

  it('should ...', inject([KafkaserviceService], (service: KafkaserviceService) => {
    expect(service).toBeTruthy();
  }));
});
