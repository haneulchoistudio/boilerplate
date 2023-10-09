import type { Next } from "@/types";
import type { Metadata } from "next";
import Head from "next/head";

type PageLayoutProps = {
  children: React.ReactNode;
  metadata?: Metadata;
};

const PageLayout: Next.Component<PageLayoutProps> = ({
  children,
  metadata,
}) => {
  const id = "__next__page__layout";

  return (
    <>
      <Head>
        {metadata ? (
          <>
            <title>{metadata.title as string}</title>
          </>
        ) : (
          <>
            <title>Ecommerce App</title>
          </>
        )}
      </Head>
      <div id={id}>{children}</div>
    </>
  );
};

export default PageLayout;
