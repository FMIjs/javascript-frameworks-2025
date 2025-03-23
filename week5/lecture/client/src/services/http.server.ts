import { DependencyManager } from "../dependency-manager";
import { API_URL } from "../di/tokens";
import { fetchResource } from "../helpers/fetch";
import { Method } from "../types";

export class Http {
  apiURL: string;
  constructor(dm: DependencyManager) {
    this.apiURL = dm.get(API_URL);
  }

  request<R, T extends object | string = any>({
    url,
    method,
    body,
    headers,
  }: {
    url: string;
    method: Method;
    body?: T;
    headers?: Headers;
  }) {
    let reqHeaders = headers || new Headers();
    if (/\/?api/.test(url)) url = url.replace(/\/api/, this.apiURL);
    if (url.startsWith(this.apiURL)) {
      reqHeaders = new Headers({
        ...reqHeaders,
        "content-type": "application/json",
      });
    }
    if (method === "PUT") return fetchResource<R>({ url, method: "PUT", body });
    if (method === "POST")
      return fetchResource<R>({ url, method: "POST", body });
    if (method === "DELETE") return fetchResource<R>({ url, method: "DELETE" });
    if (method === "GET") return fetchResource<R>({ url, method: "GET" });
    if (method === "PATCH")
      return fetchResource<R>({ url, method: "PATCH", body });
    return fetchResource<R>({ url, method: "OPTIONS" });
  }

  put<R, T extends object | string = any>(
    url: string,
    body: T,
    headers?: Headers
  ) {
    return this.request<R, T>({ url, method: "PUT", body, headers });
  }

  post<R, T extends object | string = any>(
    url: string,
    body: T,
    headers?: Headers
  ) {
    return this.request<R, T>({ url, method: "POST", body, headers });
  }

  delete<R>(url: string, headers?: Headers) {
    return this.request<R>({ url, method: "DELETE", headers });
  }

  get<R>(url: string, headers?: Headers) {
    return this.request<R>({ url, method: "GET", headers });
  }
}
