import { TestBed } from '@angular/core/testing';

import { JwtDecodingService } from './jwt-decoding.service';

describe('JwtDecodingService', () => {
  let service: JwtDecodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtDecodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should decode jwt token', () => {
    service.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiNk9mQ3Jvd3MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJLYXogQnJla2tlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjEiLCJleHAiOjE2Nzk0NDA0MDIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSJ9.0AWxosew_Q0MoCyq00ZAd2-aGdiwMHs7kNCWpCM1h84"
    let id = service.getId().toString();
    let username = service.getUsername();
    let level = service.getAccessLevel().toString();
    expect(id).toBe("3")
    expect(username).toBe("6OfCrows")
    expect(level).toBe("1")
  })
  it('should test lack of token', () => {
    service.token = ''
    let id = service.getId().toString();
    let username = service.getUsername();
    let level = service.getAccessLevel().toString();
    expect(id).toBe("0")
    expect(username).toBe(" ")
    expect(level).toBe("0")
  })
});
