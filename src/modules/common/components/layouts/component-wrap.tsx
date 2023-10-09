import type { Next } from "@/types";

type ComponentWrapProps = {
  children: React.ReactNode;
};

const ComponentWrap: Next.Component<ComponentWrapProps> = ({ children }) => {
  const id = "__next__component__wrap";
  return <div id={id}>{children}</div>;
};

export default ComponentWrap;
