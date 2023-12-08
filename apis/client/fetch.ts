type FetchMethod = "POST" | "PUT" | "GET" | "DELETE";
type FetchBody<T, M extends FetchMethod> = M extends "GET"
  ? {
      method: "GET";
      headers: {
        "Content-Type": "application/json";
      };
      body: never;
    }
  : {
      method: Exclude<FetchMethod, "GET">;
      headers: {
        "Content-Type": "application/json";
      };
      body: T;
    };

function __createRequestInit<
  T extends BodyInit | undefined,
  M extends FetchMethod
>(method: M, body: T) {
  const requestInit: FetchBody<T, M> = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  } as FetchBody<T, M>;

  return requestInit;
}

function api<M extends FetchMethod>(url: string, method: M) {
  const methods = {
    GET: async <Json>() => {
      const response = await fetch(url, __createRequestInit("GET", undefined));
      return [response.ok, await response.json()] as [boolean, Json];
    },
    POST: async <Json, T extends Record<string, unknown>>(body: T) => {
      const response = await fetch(
        url,
        __createRequestInit("POST", body as unknown as any)
      );
      return [response.ok, await response.json()] as [boolean, Json];
    },
    PUT: async <Json, T extends Record<string, unknown>>(body: T) => {
      const response = await fetch(
        url,
        __createRequestInit("PUT", body as unknown as any)
      );
      return [response.ok, await response.json()] as [boolean, Json];
    },
    DELETE: async <Json, T extends Record<string, unknown>>(body: T) => {
      const response = await fetch(
        url,
        __createRequestInit("DELETE", body as unknown as any)
      );
      return [response.ok, await response.json()] as [boolean, Json];
    },
  } as const;

  return methods[method];
}

export { api };
