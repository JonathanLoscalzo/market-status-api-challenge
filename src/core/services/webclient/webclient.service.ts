import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, catchError } from 'rxjs';
// import { inspect } from 'util';

@Injectable()
export abstract class WebclientService {
  protected readonly logger = new Logger(WebclientService.name);

  constructor(
    baseUrl: string,
    private errorCallback, // TODO: add typing
    private httpService: HttpService,
  ) {
    this.httpService.axiosRef.defaults.baseURL = baseUrl;

    this.httpService.axiosRef.interceptors.request.use((request) => {
      // this.logger.debug(`request: ${inspect(response.data)}`);
      return request;
    });

    this.httpService.axiosRef.interceptors.response.use((response) => {
      // this.logger.debug(`response: ${inspect(response.data)}`);
      return response;
    });
  }

  get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return this.httpService
      .get(url, config)
      .pipe(catchError(this.errorCallback));
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return this.httpService
      .post(url, data, config)
      .pipe(catchError(this.errorCallback));
  }
}
