import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER } from '../app.config'

interface IHttpResponse {
    success: boolean,
    data: any;
    message?: string;
}


@Injectable({ providedIn: 'root' })
export class RouteService {

    constructor(private httpclient: HttpClient) { }

    /*HOME----------------------------------------------------*/
    public getBtcUsdPrice() {
        return this.httpclient.get<IHttpResponse>(`${SERVER}/btc_usd`);
    }

    /*PORTFOLIO----------------------------------------------------*/
    public getPortfolio() {
        return this.httpclient.get<IHttpResponse>(`${SERVER}/portfolio`);
    }

    /*CODE----------------------------------------------------*/
    public paginateCodeSnippets(page: number, category: string) {
        return this.httpclient.get<IHttpResponse>(`${SERVER}/code/snippets/?category=${category}&page=${page}`);
    }

    /*RESUME----------------------------------------------------*/
    public downloadResume() {
        return this.httpclient.get(`${SERVER}/resume`, { observe: 'response', responseType: 'blob' });
    }
}