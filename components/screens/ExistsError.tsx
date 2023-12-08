import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

interface ExistsErrorProps<T extends 404 | 500 = 404 | 500> {
  errorCode: T;
  title: string;
  description: string;
  link?: React.ReactNode;
}

const ExistsError = ({
  errorCode,
  title,
  description,
  link,
}: ExistsErrorProps) => {
  const router = useRouter();
  const asPath = router.asPath;

  return (
    <div
      id={`__error:${errorCode}`}
      className={twMerge(
        "h-screen flex justify-center items-center p-8 md:p-12 lg:p-16 2xl:p-32"
      )}
    >
      <article className="flex flex-col">
        <h2 className="font-medium  text-4xl 2xl:text-5xl mb-1 lg:mb-1.5 2xl:mb-2.5">
          {title}
        </h2>
        <div className="flex items-center gap-x-1.5 lg:gap-x-2 text-lg lg:text-xl opacity-60 mb-3 lg:mb-5">
          <span className="text-red-500">{errorCode}</span>

          <p className="font-light text-base opacity-75 lg:text-lg">
            &apos;{asPath}&apos; {description}
          </p>
        </div>

        {link && link}
      </article>
    </div>
  );
};

export default ExistsError;
