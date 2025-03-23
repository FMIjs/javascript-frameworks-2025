import { mergeMap, Observable, throwError } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { Method } from "../types";

type FetchResource = {
  url: string;
  method: Method;
  body?: string | number | object;
  headers?: Headers;
};

export function fetchResource<R>({
  url,
  method = "GET",
  body,
  headers,
}: FetchResource): Observable<R> {
  const payload =
    body && typeof body === "object" && body !== null
      ? JSON.stringify(body)
      : undefined;

  return fromFetch(url, { method, body: payload, headers }).pipe(
    mergeMap((res) => {
      if (!res.ok) return throwError(() => res);
      if (res.headers.get("content-type")?.includes("application/json"))
        return res.json();
      return res.text();
    })
  );
}
