import { NextPage as NP } from "next";
import { AppProps as AP } from "next/app";
import { ComponentType, ReactElement, ReactNode } from "react";

export type AppPage<P = {}, IP = P> = NP<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppProps = AP & {
  Component: AppPage;
};
