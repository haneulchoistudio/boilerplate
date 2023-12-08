// Use this on nodejs runtime.

import { ObjectId } from "mongodb";
import type { GetServerSidePropsContext, Redirect } from "next";

type ReturnProps<T extends Record<string, unknown>, K> = {
  props: T;
};

/** Pass an object that will return as a props object in `next.GetServerSideProps` */
function props<Props extends Record<string, unknown>, K extends keyof Props>(
  props: Props
) {
  return { props } as ReturnProps<Props, K>;
}

export {props}

type RedirectProps<D extends string, P extends boolean> = {
  redirect: {
    destination: D;
    permanent: P;
  };
};

/** Returns an `next.Redirect` object corresponding to the destination `string` and permanent `boolean` passed. */
function redirects<ToWhere extends string>(
  destination: ToWhere,
  permanent: boolean = false
) {
  const redirect: Redirect = {
    destination,
    permanent,
  };

  return {
    redirect,
  } as RedirectProps<ToWhere, typeof permanent>;
}

export { redirects };

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
