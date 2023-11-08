import { withMiddleware } from "@/apis/server";
import type { PageWithLayout } from "@/types/next";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type PageProps = { data: string };

const Home: PageWithLayout<PageProps> = () => {
  return <></>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) =>
  await withMiddleware<PageProps>(ctx, async function (ctx) {
    let un: unknown;

    if (un) {
      return { redirect: { destination: "/dash", permanent: false } };
    }

    return { props: { data: "" } };
  });
Home.getLayout = (page) => page;

export default Home;
