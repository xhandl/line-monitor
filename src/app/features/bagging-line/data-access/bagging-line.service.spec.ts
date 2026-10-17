import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoggerService } from '@core/logging/logger.service';
import { Machine } from '../models/machine.model';
import { BaggingLineService, MACHINES_URL } from './bagging-line.service';

const MACHINES: Machine[] = [
  { id: 'scale', type: 'scale', name: 'Scale', status: 'running' },
  { id: 'packer', type: 'packer', name: 'Packer', status: 'alarm' },
];

describe('BaggingLineService', () => {
  let service: BaggingLineService;
  let http: HttpTestingController;
  const logger = { error: vi.fn() };

  beforeEach(() => {
    logger.error.mockReset();
    TestBed.configureTestingModule({
      providers: [
        BaggingLineService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: LoggerService, useValue: logger },
      ],
    });
    service = TestBed.inject(BaggingLineService);
    http = TestBed.inject(HttpTestingController);
    // Resources load through effects, flush them so the request gets sent.
    TestBed.tick();
  });

  afterEach(() => http.verify());

  // The resource applies the response asynchronously.
  const settle = () => TestBed.inject(ApplicationRef).whenStable();

  it('should be loading while the request is pending', async () => {
    expect(service.loading()).toBe(true);
    expect(service.machines()).toEqual([]);

    http.expectOne(MACHINES_URL).flush(MACHINES);
    await settle();

    expect(service.loading()).toBe(false);
    expect(service.machines()).toEqual(MACHINES);
    expect(service.error()).toBeNull();
  });

  it('should expose an error when loading fails', async () => {
    http.expectOne(MACHINES_URL).flush(null, { status: 404, statusText: 'Not Found' });
    await settle();

    expect(service.machines()).toEqual([]);
    expect(service.loading()).toBe(false);
    expect(service.error()).toBe('Machine data could not be loaded.');
  });

  it.each([
    ['not an array', { machines: MACHINES }],
    ['an unknown status', [{ ...MACHINES[0], status: 'stopped' }]],
    ['an unknown type', [{ ...MACHINES[0], type: 'robot' }]],
    ['a missing name', [{ id: 'scale', type: 'scale', status: 'running' }]],
  ])('should expose an error when the response has %s', async (_, response) => {
    http.expectOne(MACHINES_URL).flush(response);
    await settle();

    expect(service.machines()).toEqual([]);
    expect(service.error()).toBe('Machine data could not be loaded.');
  });

  it('should log only the invalid items', async () => {
    const invalid = { ...MACHINES[0], status: 'stopped' };
    http.expectOne(MACHINES_URL).flush([MACHINES[1], invalid]);
    await settle();

    expect(logger.error).toHaveBeenCalledWith(
      `Invalid machine data received from ${MACHINES_URL}`,
      [invalid],
    );
  });

  it('should not log valid data', async () => {
    http.expectOne(MACHINES_URL).flush(MACHINES);
    await settle();

    expect(logger.error).not.toHaveBeenCalled();
  });

  it('should recover from an error on reload', async () => {
    http.expectOne(MACHINES_URL).flush(null, { status: 500, statusText: 'Server Error' });
    await settle();

    service.reload();
    TestBed.tick();
    http.expectOne(MACHINES_URL).flush(MACHINES);
    await settle();

    expect(service.machines()).toEqual(MACHINES);
    expect(service.error()).toBeNull();
  });
});
