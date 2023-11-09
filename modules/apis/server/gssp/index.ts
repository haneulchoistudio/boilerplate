import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  Redirect,
} from "next";

async function withMiddleware<T extends object = {}>(
  ctx: GetServerSidePropsContext,
  result: GetServerSideProps<T>
) {
  console.log("\n");
  console.log("> Activated.");
  console.log(`\tHost > '${ctx.req.headers.host as string}'`);
  console.log(`\tUrl > '${ctx.resolvedUrl as string}'`);
  const res = await result(ctx);
  if (Object.keys(res).includes("redirect")) {
    let _res = structuredClone(res) as { redirect: Redirect };
    console.log(`> Redirected to ${_res.redirect.destination}`);
  } else {
    console.log("> Stay here");
  }
  console.log("> Completed.");
  console.log("\n");
  return res;
}

async function gsspHome(ctx: GetServerSidePropsContext) {
  return { props: {} };
}

const pages = {
  "/": async (ctx: GetServerSidePropsContext) =>
    await withMiddleware(ctx, gsspHome),
};

export function getGssp<T extends object = {}>(
  page: keyof typeof pages
): GetServerSideProps<T> {
  return pages[page] as GetServerSideProps<T>;
}
