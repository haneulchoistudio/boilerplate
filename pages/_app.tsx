import "@/m/s/index.css";
import { SessionProvider } from "next-auth/react";
import type { AppPropsWithLayout } from "@/m/t/nextjs";

export default function App({
  Component,
  pageProps,
  router,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}
