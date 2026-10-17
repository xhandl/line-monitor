import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../logging/logger.service';
import { httpErrorInterceptor } from './http-error.interceptor';

describe('httpErrorInterceptor', () => {
  const logger = { error: vi.fn() };
  let http: HttpClient;
  let backend: HttpTestingController;

  beforeEach(() => {
    logger.error.mockReset();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([httpErrorInterceptor])),
        provideHttpClientTesting(),
        { provide: LoggerService, useValue: logger },
      ],
    });
    http = TestBed.inject(HttpClient);
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => backend.verify());

  it('should log a failed request and pass the error on', () => {
    const error = vi.fn();
    http.get('/data').subscribe({ error });

    backend.expectOne('/data').flush(null, { status: 500, statusText: 'Server Error' });

    expect(logger.error).toHaveBeenCalledWith('HTTP GET /data failed with 500', expect.anything());
    expect(error).toHaveBeenCalled();
  });

  it('should not log a successful request', () => {
    http.get('/data').subscribe();

    backend.expectOne('/data').flush({});

    expect(logger.error).not.toHaveBeenCalled();
  });
});
