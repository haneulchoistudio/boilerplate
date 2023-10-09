import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { AppProps } from "next/app";
import { ComponentType, ReactElement, ReactNode } from "react";

declare namespace Next {
  export type PageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
  export type AppPropsWithLayout = AppProps & {
    Component: PageWithLayout;
  };

  export type SSR = GetServerSideProps;
  export type SSRContext = GetServerSidePropsContext;
  export type Component<Props extends object = unknown> =
    React.ComponentType<Props>;
  export type Dispatch = React.Dispatch;
  export type SetStateAction = React.SetStateAction;
  export type Node = React.ReactNode;
}
