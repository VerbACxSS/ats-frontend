import {inject} from "@angular/core";
import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {delay, finalize, Observable, queueScheduler} from "rxjs";
import {HttpLoaderService} from './services/http-loader.service';
import {environment} from '../environments/environment';

export const backendInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const httpLoaderService = inject(HttpLoaderService);

  if (!req.url.startsWith(environment.BACKEND_URL)){
    return next(req);
  }

  // Show loader
  httpLoaderService.startRequest();

  // Send request with Accept-Language Header
  return next(req)
    .pipe(
      delay(100, queueScheduler),
      finalize(() => {
        httpLoaderService.finishRequest();
      })
    );
}
