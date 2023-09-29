import "@/styles/globals.css";
import { ComponentLayout } from "@/modules/common/components/layouts";
import type { AppPropsWithLayout } from "./pages";

export default function Ecommerce({
  Component,
  pageProps,
  router,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <ComponentLayout route={router.route}>
      <Component {...pageProps} />
    </ComponentLayout>
  );
}
