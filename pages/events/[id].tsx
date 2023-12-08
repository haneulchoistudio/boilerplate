import { GetServerSideProps } from "next";

export default function EventId({ id }: { id: string }) {
  return <div>Event Detail wiht Id {id}</div>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: { id: ctx.query.id } };
};
