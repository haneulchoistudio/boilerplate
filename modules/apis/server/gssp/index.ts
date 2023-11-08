import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  Redirect,
} from "next";

export async function withMiddleware<T extends object = {}>(
  ctx: GetServerSidePropsContext,
  getServerSideProps: GetServerSideProps<T>
) {
  __withMiddleware_activate();
  const gssp = await getServerSideProps(ctx);
  __withMiddleware_print({
    host: ctx.req.headers.host || "",
    url: ctx.resolvedUrl,
  });
  if (Object.keys(gssp).includes("redirect")) {
    let shallowCopyOfGsspWithRedirect = gssp as unknown as {
      redirect: Redirect;
    };
    __withMiddleware_redirect(
      shallowCopyOfGsspWithRedirect.redirect.destination
    );
  } else {
    __withMiddleware_stay();
  }

  __withMiddleware_complete();
  return gssp;
}

function __withMiddleware_activate() {
  console.log("\n");
  console.log("> [GSSP] activated.");
}
function __withMiddleware_complete() {
  console.log("> [GSSP] completed.");
  console.log("\n");
}
function __withMiddleware_redirect(to: string) {
  console.log(`\t➡️ It will redirect to '${to}'.`);
}
function __withMiddleware_stay() {
  console.log(`\t➡️ It will stay.`);
}
type PrintField = {
  host: string;
  url: string;
};
function __withMiddleware_print(printField: PrintField) {
  console.log(`\t➡️ It was requested from '${printField.host}'.`);
  console.log(
    `\t➡️ It was resolved with the url '${printField.url as string}'.`
  );
}
