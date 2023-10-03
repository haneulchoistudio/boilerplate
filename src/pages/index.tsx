import { PageLayout } from "@/modules/common";
import type { AppPage } from "@/types";

const Homepage: AppPage = () => {
  return (
    <PageLayout>
      <></>
    </PageLayout>
  );
};

Homepage.getLayout = (page) => page;
