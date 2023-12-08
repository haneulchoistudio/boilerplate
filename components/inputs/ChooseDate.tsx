import { twMerge } from "tailwind-merge";

interface ChooseDateProps {
  label?: string;
  date: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  classNames?: {
    label?: string;
    input?: string;
  };

  placeholder?: string;
}

const ChooseDate: React.FC<ChooseDateProps> = ({
  label,
  onChange,
  placeholder = "",
  date,
  classNames = { label: "", input: "" },
}) => {
  return (
    <div className="relative w-full">
      {label && (
        <label className={twMerge("", classNames.label)}>{label}</label>
      )}
      <input
        autoFocus
        value={date}
        onChange={onChange}
        type="date"
        className={twMerge("w-full", classNames.input ?? "")}
        placeholder={placeholder}
      />
    </div>
  );
};

export default ChooseDate;
