import "@/styles/app.css";
import { ComponentLayout } from "@/modules/common/components/layouts";
import type { AppProps } from "@/types";

export default function Ecommerce({ Component, pageProps, router }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <ComponentLayout route={router.route}>
      <Component {...pageProps} />
    </ComponentLayout>
  );
}
