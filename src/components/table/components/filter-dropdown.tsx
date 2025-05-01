import React, { useState } from "react";
import { motion as m } from "framer-motion";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";

interface FilterDropdownProps {
  name: string;
  options: string[];
  onChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  name,
  options,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(`All ${name}`);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onChange(option === `All ${name}` ? "" : option);
  };

  return (
    <Listbox value={selectedOption} onChange={handleSelect}>
      <div className="relative w-full md:flex-1">
        <ListboxButton
          className="font-poppins font-light w-full cursor-default flex flex-1 justify-between items-center  rounded-md bg-white py-2.5 pr-2
         pl-3 text-left text-[#324054] outline-1 -outline-offset-1 border border-[#71839B]
         outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm md:text-base xl:text-lg"
        >
          <span className="col-start-1 row-start-1 truncate pr-6 capitalize">
            {/* {selectedOption?.endsWith("s")
              ? selectedOption
                  ?.toString()
                  ?.replace("_", " ")
                  ?.concat("es")
                  ?.toLowerCase()
              : selectedOption
                  ?.toString()
                  ?.replace("_", " ")
                  ?.concat("s")
                  ?.toLowerCase()} */}
                  {selectedOption}
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-none sm:text-sm"
        >
          {/* Add "All {name}" dynamically */}
          <ListboxOption
            key="all"
            value={`All ${name}`}
            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-none"
          >
            <m.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="block truncate font-normal group-data-selected:font-semibold capitalize"
            >
              All{" "}
              {name?.endsWith("s")
                ? name
                    ?.toString()
                    ?.replace("_", " ")
                    ?.concat("es")
                    ?.toLowerCase()
                : name
                    ?.toString()
                    ?.replace("_", " ")
                    ?.concat("s")
                    ?.toLowerCase()}
            </m.span>
          </ListboxOption>

          {/* Render the rest of the options */}
          {options.map((option, idx) => (
            <ListboxOption
              key={idx}
              value={option}
              className="group relative cursor-default py-2 pr-9 pl-3
               text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-none"
            >
              <m.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx + 1) * 0.05 }}
                className="block truncate font-normal group-data-selected:font-semibold capitalize"
              >
                {option.toString().replace("_", " ").toLowerCase()}
              </m.span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default FilterDropdown;
