import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function myHttpInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  return next(
    req.clone({
      url: `https://jsonplaceholder.typicode.com${req.url}`,
    })
  );
}
