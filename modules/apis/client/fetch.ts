type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";
function __fetch__(apiRoute: string, method: FetchMethod) {
  async function getResponse<BodyJson extends object = {}>(body?: BodyJson) {
    const response = await fetch(apiRoute, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    return response;
  }
  async function getJson<
    ResponseJson extends object = {},
    BodyJson extends object = {}
  >(body?: BodyJson) {
    const response = await getResponse<BodyJson>(body);
    return (await response.json()) as unknown as ResponseJson;
  }

  return {
    url: apiRoute,
    method,
    getJson,
  };
}

export async function GET<
  Route extends string,
  Json extends object = {},
  Body extends object = {}
>(route: Route, body: Body) {
  const { getJson } = __fetch__(route, "GET");
  const json = await getJson<Json>(body);
  return json;
}

export async function POST<
  Route extends string,
  Json extends object = {},
  Body extends object = {}
>(route: Route, body: Body) {
  const { getJson } = __fetch__(route, "POST");
  const json = await getJson<Json>(body);
  return json;
}

export async function PUT<
  Route extends string,
  Json extends object = {},
  Body extends object = {}
>(route: Route, body: Body) {
  const { getJson } = __fetch__(route, "PUT");
  const json = await getJson<Json>(body);
  return json;
}

export async function DELETE<
  Route extends string,
  Json extends object = {},
  Body extends object = {}
>(route: Route, body: Body) {
  const { getJson } = __fetch__(route, "DELETE");
  const json = await getJson<Json>(body);
  return json;
}
