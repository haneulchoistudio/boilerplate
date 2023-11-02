import type { PageWithLayout } from "@/m/t/nextjs";
import { Prisma } from "@prisma/client";

type PageProps = {};

const Home: PageWithLayout<PageProps> = () => {
  return <></>;
};

Home.getLayout = (page) => page;

export default Home;
