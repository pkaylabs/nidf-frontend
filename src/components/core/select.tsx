import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

interface SelectOption {
  name: string;
  value: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  onChange: (selected: SelectOption) => void;
}

const Select: React.FC<SelectProps> = ({ label, options, onChange }) => {
  const [selected, setSelected] = useState<SelectOption>({
    name: "",
    value: "",
  });

  const handleChange = (option: SelectOption) => {
    setSelected(option);
    onChange(option);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <Label className="block text-lg font-medium text-black">{label}</Label>
      <div className="relative mt-2">
        <ListboxButton className="flex justify-between items-center w-full border border-[#71839B] cursor-default rounded-md bg-white py-3 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
          {/* <span className="col-start-1 row-start-1 truncate pr-6">{}</span> */}
          <input
            type="text"
            placeholder="Select Project"
            value={selected.name}
            // disabled
            readOnly
            className="w-full bg-transparent outline-none cursor-default text-base placeholder:font-light "
          />
          <ChevronUpDownIcon
            aria-hidden="true"
            className="size-5 self-center justify-self-end text-gray-500 "
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-none sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-none"
            >
              <span className="block truncate font-normal group-data-selected:font-semibold">
                {option.name}
              </span>
              {selected.value === option.value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-focus:text-white">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default Select;
