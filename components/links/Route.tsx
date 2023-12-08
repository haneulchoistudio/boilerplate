import Link from "next/link";
import { ParsedUrlQueryInput } from "querystring";
import { twMerge } from "tailwind-merge";

interface RouteProps<Variant extends "deep" | "shallow" = "deep" | "shallow"> {
  pathname?: Variant extends "deep" ? string : never;
  as?: Variant extends "deep" ? string : never;
  query?: Variant extends "deep" ? ParsedUrlQueryInput : never;
  href?: Variant extends "deep" ? never : string;
  className?: string;

  variant?: Variant;
}

const Route = ({
  children = null,
  href,
  as,
  pathname,
  query,
  className = "",
  variant = "shallow",
}: RouteProps & React.PropsWithChildren) => {
  if (!children) return null;

  if (variant === "deep") {
    return (
      <Link
        href={{ pathname, query }}
        as={as}
        className={twMerge("", className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link href={href as string} className={twMerge("", className)}>
      {children}
    </Link>
  );
};

export default Route;
