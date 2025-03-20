import { mergeMap, throwError } from "rxjs";
import { fromFetch } from "rxjs/fetch";

const apiServer = "http://localhost:3000/api";

type FetchParams = Parameters<typeof fromFetch>;

type Method = NonNullable<FetchParams["1"]>["method"];
type Headers = NonNullable<FetchParams["1"]>["headers"];

type FetchResource = {
  url: string;
  method: Method;
  body?: string | number | object;
  headers?: Headers;
};

export function fetchResource({
  url,
  method = "GET",
  body,
  headers,
}: FetchResource) {
  const payload =
    body && typeof body === "object" && body !== null
      ? JSON.stringify(body)
      : undefined;
  let reqHeaders = headers || new Headers();
  if (/\/?api/.test(url)) url = url.replace(/\/api/, apiServer);
  if (url.startsWith(apiServer)) {
    reqHeaders = new Headers({
      ...reqHeaders,
      "content-type": "application/json",
    });
  }

  return fromFetch(url, { method, body: payload, headers: reqHeaders }).pipe(
    mergeMap((res) => {
      if (!res.ok) return throwError(() => res);
      if (res.headers.get("content-type")?.includes("application/json"))
        return res.json();
      return res.text();
    })
  );
}
