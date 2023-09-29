import type { NextRouter } from "next/router";

type ComponentLayoutProps = {
  route: NextRouter["route"];
  children: React.ReactNode;
};

const ComponentLayout: React.ComponentType<ComponentLayoutProps> = ({
  route,
  children,
}) => {
  const id = ["__COMPONENT__LAYOUT", route].join(":");

  return <div id={id}>{children}</div>;
};

export default ComponentLayout;
