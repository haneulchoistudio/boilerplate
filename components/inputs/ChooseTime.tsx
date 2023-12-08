import { twMerge } from "tailwind-merge";

interface ChooseTimeProps {
  label?: string;
  time: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  classNames?: {
    label?: string;
    input?: string;
  };

  placeholder?: string;
}

const ChooseTime: React.FC<ChooseTimeProps> = ({
  label,
  onChange,
  placeholder = "",
  time,
  classNames = { label: "", input: "" },
}) => {
  return (
    <div className="relative w-full">
      {label && (
        <label className={twMerge("", classNames.label)}>{label}</label>
      )}
      <input
        autoFocus
        value={time}
        onChange={onChange}
        type="time"
        className={twMerge("w-full", classNames.input ?? "")}
        placeholder={placeholder}
      />
    </div>
  );
};

export default ChooseTime;
