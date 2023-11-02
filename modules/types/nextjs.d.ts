import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type PageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
export type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};

export type Component<Props extends object = unknown> =
  React.ComponentType<Props>;
