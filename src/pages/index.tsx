import { getAuthUser } from "@/modules/apis";
import { PageLayout } from "@/modules/common";
import type { Next } from "@/types";

const Homepage: Next.PageWithLayout = () => {
  return (
    <PageLayout>
      <>Homepage</>
    </PageLayout>
  );
};

Homepage.getLayout = (page) => page;

export const getServerSideProps: Next.SSR = async (ctx) => {
  const user = await getAuthUser(ctx);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { user } };
};

export default Homepage;
