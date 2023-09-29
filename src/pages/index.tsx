import { PageLayout } from "@/modules/common/components/layouts";
import type { NextPageWithLayout } from "./pages";

const Homepage: NextPageWithLayout = () => {
  return <PageLayout>Homepage</PageLayout>;
};

Homepage.getLayout = (page) => {
  return page;
};

export default Homepage;
