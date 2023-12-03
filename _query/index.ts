// Use this on nodejs runtime.

import { ObjectId } from "mongodb";
import type { GetServerSidePropsContext } from "next";

export type PathnameAndQuery = {
  pathname: string;
  query: Record<string, string>;
};

function getPathnameAndQuery(
  page: string,
  dynamicId: string,
  queryKey: [string]
): PathnameAndQuery;
function getPathnameAndQuery(
  page: Array<string>,
  dynamicId: string,
  queryKey: [string]
): PathnameAndQuery;
function getPathnameAndQuery(
  page: Array<string>,
  dynamicId: Array<string>,
  queryKey: [string, string]
): PathnameAndQuery;

function getPathnameAndQuery(
  key: string | Array<string>,
  dynamicId: string | Array<string>,
  queryKey: [string] | [string, string]
): PathnameAndQuery {
  let path: string = "";

  if (Array.isArray(key)) {
    if (Array.isArray(dynamicId)) {
      let paths: string[] = [];
      let length = key.length;

      for (let i = 0; i < length; i++) {
        paths.push(key[i]);
        paths.push(dynamicId[i]);
      }

      path = paths.join("/");

      let query: PathnameAndQuery["query"] = {};

      const queryKey1 = `${queryKey[0]}`;
      const queryKey2 = `${queryKey[1]}`;

      query[queryKey1] = dynamicId[0];
      query[queryKey2] = dynamicId[1];

      return {
        pathname: `/${path}`,
        query,
      };
    }
    if (typeof dynamicId === "string") {
      path = [key[0], dynamicId, key[1]].join("/");

      let query: PathnameAndQuery["query"] = {};

      const queryKey1 = `${queryKey[0]}`;

      query[queryKey1] = dynamicId;

      return {
        pathname: `/${path}`,
        query,
      };
    }
    return { pathname: "", query: {} };
  }
  if (typeof key === "string") {
    path = [key, dynamicId].join("/");

    let query: PathnameAndQuery["query"] = {};

    const queryKey1 = `${queryKey[0]}`;

    query[queryKey1] = dynamicId as string;

    return {
      pathname: `/${path}`,
      query,
    };
  }

  return {
    pathname: "",
    query: {},
  };
}

export { getPathnameAndQuery };

function concatPathQuery(
  pathWithQuery: PathnameAndQuery["pathname"],
  ...pages: Array<string>
) {
  return [pathWithQuery, ...pages].join("/");
}

export { concatPathQuery };

type ContextValidity = {
  valid: boolean;
};

function __getQueryValidity__(
  ctx: GetServerSidePropsContext,
  validateKey: string
) {
  const query = ctx.query;
  const value = (query[validateKey] as string) ?? "";

  let validity: ContextValidity = { valid: false };

  validity.valid = value ? true : false;

  let kv: Record<string, string> = {};

  kv[validateKey] = value;

  return {
    ...validity,
    ...kv,
  } as ContextValidity & Record<string, string>;
}

export { __getQueryValidity__ };

function getValidity<ID extends string>(
  ctx: GetServerSidePropsContext,
  validateKey: ID
) {
  const { valid } = __getQueryValidity__(ctx, validateKey);
  const query = ctx.query;
  const value = query[validateKey] as string;

  let validity: ContextValidity = {
    valid: valid && ObjectId.isValid(value),
  };

  let kv: Record<string, string> = {};

  kv[validateKey] = value;

  return {
    ...validity,
    ...kv,
  } as ContextValidity & Record<ID, string>;
}

export { getValidity };
