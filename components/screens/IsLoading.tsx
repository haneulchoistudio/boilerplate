import { twMerge } from "tailwind-merge";

interface IsLoadingProps {
  message: string;
  coverScreen?: boolean;
}

const IsLoading: React.FC<IsLoadingProps> = ({
  message,
  coverScreen = false,
}) => {
  return (
    <div
      className={twMerge(
        "text-center flex flex-col items-center gap-y-2.5 lg:gap-y-3.5 bg-white",
        coverScreen ? "h-screen justify-center" : "h-auto"
      )}
    >
      <article className="flex justify-center items-center ">
        <span className="w-[42.5px] lg:w-[47.5px] h-[42.5px] lg:h-[47.5px] rounded-full flex justify-center items-center bg-gradient-to-tr from-blue-500 to-sky-500 animate-spin ">
          <span
            className={twMerge(
              "w-[40.5px] lg:w-[45px] h-[40.5px] lg:h-[45px] bg-white rounded-full block ring ring-blue-500/50"
            )}
          />
        </span>
      </article>
      <p className="px-8 text-center truncate text-blue-500/75 font-light lg:text-lg animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default IsLoading;
