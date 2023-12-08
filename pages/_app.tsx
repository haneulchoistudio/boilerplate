import { AppProps } from "next/app";
import { AppPropsType } from "next/dist/shared/lib/utils";
import "~/styles/index.css";

export default function App({ Component, ...pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
