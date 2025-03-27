import React from "react";
import { motion as m } from "framer-motion";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";

interface FilterDropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

const SelectDropdown: React.FC<FilterDropdownProps> = ({
  options,
  value,
  onChange,
}) => {
  // Compute the selected option based on the passed value.
  const selectedOption = options?.find((opt) => opt.value === value) || null;

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative flex-1 mt-2">
        <ListboxButton className="font-poppins font-light w-full cursor-default flex flex-1 justify-between items-center rounded-md bg-white py-3 pr-2 pl-3 text-left text-[#324054] border border-[#71839B] focus:outline-indigo-600 sm:text-sm md:text-base xl:text-lg">
          <span className="truncate pr-6">
            {selectedOption ? selectedOption.label : "Select an option"}
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>
        <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-none sm:text-sm">
          {options?.map((option, idx) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-[focus]:bg-primary-600 data-[focus]:text-white"
            >
              <m.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx + 1) * 0.05 }}
                className="block truncate font-normal group-data-[selected]:font-semibold"
              >
                {option.label ?? "No label"}
              </m.span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default SelectDropdown;
