import "@/styles/index.css";
import type { AppPropsWithLayout } from "@/types/next";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}
