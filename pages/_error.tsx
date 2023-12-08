import { props } from "~/apis/server";
import type { GetServerSideProps } from "next";
import { ExistsError } from "~/components/screens";

type Props = {
  errorCode: 404 | 500;
};

export default function ErrorPage({ errorCode }: Props) {
  return errorCode === 404 ? (
    <ExistsError
      errorCode={errorCode}
      title="Oops"
      description="This page does not exist."
    />
  ) : errorCode === 500 ? (
    <ExistsError
      errorCode={errorCode}
      title="Oops"
      description="This page does not exist."
    />
  ) : null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const errorCode = res.statusCode as Props["errorCode"];
  return props({ errorCode });
};
