import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000';

export function HttpInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  let url = req.url;

  const isApiUrl = url.startsWith('/api');
  if (isApiUrl) {
    url = url.replace('/api', API_URL);
  }

  const reqUpdate = { url }
  return next(req.clone(reqUpdate));
}
