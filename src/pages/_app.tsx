import "@/styles/app.css";
import { ComponentWrap as CW } from "@/modules/common";
import type { Next } from "@/types";
import { SessionProvider as SP } from "next-auth/react";

export default function WebApp({
  Component: C,
  pageProps: pP,
  router: R,
}: Next.AppPropsWithLayout) {
  const gL = C.getLayout || ((page) => page);
  return (
    <SP session={pP.session}>
      {gL(
        <CW>
          <C {...pP} />
        </CW>
      )}
    </SP>
  );
}
