import { twMerge } from "tailwind-merge";

interface ContainerProps {
  TITLE: string;
  classNames?: {
    screen?: string;
    wrapper?: string;
  };
  coverScreen?: boolean;
  hasWrapper?: boolean;
}

const Container: React.FC<ContainerProps & React.PropsWithChildren> = ({
  children = null,
  classNames = {
    screen: "bg-white text-neutral-900",
    wrapper: "",
  },
  coverScreen = false,
  hasWrapper = false,
  TITLE,
}) => {
  return (
    children && (
      <div
        id={`__container:${TITLE.split(" ").join("__")}`}
        className={twMerge(
          hasWrapper ? "w-full" : "px-8 md:px-12 lg:px-16 2xl:px-32 w-full",
          coverScreen ? "h-screen" : "h-auto",
          classNames.screen
        )}
      >
        {hasWrapper ? (
          <section
            className={twMerge(
              "px-8 md:px-12 lg:px-16 2xl:px-32 w-full",
              classNames.wrapper
            )}
          >
            {children}
          </section>
        ) : (
          children
        )}
      </div>
    )
  );
};

export default Container;
