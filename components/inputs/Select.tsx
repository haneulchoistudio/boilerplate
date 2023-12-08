import { twMerge } from "tailwind-merge";

interface SelectProps<T> {
  items: T[];
  selected: T;
  onSelect: (item: T) => void;
  onSelectCreateText: (selected: T) => string;
  label?: string;
  classNames?: {
    selected?: string;
    item?: string;
    list?: string;
    text?: string;
    label?: string;
  };
}

const Select = <T extends string>({
  items,
  label,
  selected,
  onSelect,
  onSelectCreateText,
  classNames = {
    item: "",
    list: "",
    selected: "",
    text: "",
  },
}: SelectProps<T>) => {
  return (
    <div className="w-full relative">
      {label && (
        <label className={twMerge("", classNames.label)}>{label}</label>
      )}
      <ul className={twMerge("", classNames.list)}>
        {items.map((item, idx) => (
          <button
            onClick={() => onSelect(item)}
            type="button"
            key={idx}
            className={twMerge(
              "",
              selected === item && classNames.selected,
              selected !== item && classNames.item
            )}
          >
            {item}
          </button>
        ))}
      </ul>
      {onSelectCreateText && typeof onSelectCreateText === "function" && (
        <p className={twMerge("", classNames.text)}>
          {onSelectCreateText(selected)}
        </p>
      )}
    </div>
  );
};

export default Select;
