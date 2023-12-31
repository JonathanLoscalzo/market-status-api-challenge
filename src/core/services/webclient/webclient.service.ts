import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable, catchError } from 'rxjs';
// import { inspect } from 'util';

@Injectable()
export abstract class WebclientService {
  protected readonly logger = new Logger(WebclientService.name);

  constructor(
    baseUrl: string,
    private httpService: HttpService,
  ) {
    // TODO: change with factory at https://docs.nestjs.com/techniques/http-module#async-configuration
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

  get(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse> {
    return this.httpService.get(url, config).pipe(
      catchError((error: AxiosError) => {
        this.logger.error(error);
        throw new HttpException(error.response, error.response.status);
      }),
    );
  }
}
