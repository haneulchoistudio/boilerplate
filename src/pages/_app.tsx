import "~/styles/index.css";
import type { AppProps } from "next/app";

export default function App(props: AppProps) {
  const { Component, pageProps: moreProps, router: _Router } = props;
  const { ...pageProps } = moreProps;
  return <Component {...pageProps} />;
}
