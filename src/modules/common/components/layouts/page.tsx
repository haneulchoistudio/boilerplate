import type { Component } from "@/types";
import type { Metadata } from "next";
import Head from "next/head";

type PageLayoutProps = {
  children: React.ReactNode;
  metadata?: Metadata;
};

const PageLayout: Component<PageLayoutProps> = ({ children, metadata }) => {
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
      <div id="__PAGE_LAYOUT">{children}</div>
    </>
  );
};

export default PageLayout;
