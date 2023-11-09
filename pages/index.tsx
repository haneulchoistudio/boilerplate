import { getGssp } from "@/apis/server";
import type { PageWithLayout } from "@/types/next";
type PageProps = { data: string };
export const getServerSideProps = getGssp<PageProps>("/");
const Home: PageWithLayout<PageProps> = () => {
  return <></>;
};
Home.getLayout = (page) => page;
export default Home;
