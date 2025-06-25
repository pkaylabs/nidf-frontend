import React, { useState, useEffect, useRef } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/16/solid";
import { cn } from "@/utils/cs";

interface ComboboxOption {
  id: string;
  name: string;
  [key: string]: any;
}

interface SearchableComboboxProps {
  options: ComboboxOption[];
  value: ComboboxOption | null;
  onChange: (value: ComboboxOption | null) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  displayValue?: (option: ComboboxOption) => string;
}

const SearchableCombobox: React.FC<SearchableComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  error = false,
  displayValue = (option) => option?.name || "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery("");
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 
  useEffect(() => {
    if (value && !isOpen) {
      setQuery("");
    }
  }, [value, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === "Enter" || e.key === "ArrowDown")) {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex(0);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setQuery("");
        setFocusedIndex(-1);
        inputRef.current?.blur();
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          handleSelect(filteredOptions[focusedIndex]);
        }
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setIsOpen(true);
    setFocusedIndex(-1);
    
   
    if (!inputValue.trim()) {
      onChange(null);
    }
  };

  const handleSelect = (option: ComboboxOption) => {
    onChange(option);
    setQuery("");
    setIsOpen(false);
    setFocusedIndex(-1);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (value && !query) {
      setQuery("");
    }
  };

  const handleButtonClick = () => {
    if (isOpen) {
      setIsOpen(false);
      setQuery("");
      setFocusedIndex(-1);
    } else {
      setIsOpen(true);
      inputRef.current?.focus();
    }
  };

  const getDisplayValue = () => {
    if (query && isOpen) return query;
    if (value) return displayValue(value);
    return "";
  };

  return (
    <div ref={containerRef} className="relative flex-1" onKeyDown={handleKeyDown}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={getDisplayValue()}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={cn(
            "font-poppins font-light w-full cursor-default flex flex-1 justify-between items-center rounded-md bg-white py-3 pr-10 pl-3 text-left text-[#324054] border border-[#71839B] focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent sm:text-sm md:text-base xl:text-lg transition-all duration-200",
            error && "border-[#fc8181] focus:ring-red-500",
            className
          )}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          role="combobox"
        />
        
        <button
          type="button"
          onClick={handleButtonClick}
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
        >
          <ChevronUpDownIcon
            aria-hidden="true"
            className={cn(
              "size-5 text-gray-500 sm:size-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <m.div
            ref={optionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-none sm:text-sm"
          >
            {filteredOptions.length === 0 ? (
              <div className="relative cursor-default select-none py-2 px-3 text-gray-500">
                No options found
              </div>
            ) : (
              filteredOptions.map((option, idx) => (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "group relative cursor-default py-2 px-4 text-gray-900 select-none transition-colors duration-150",
                    focusedIndex === idx && "bg-primary-600 text-white",
                    "hover:bg-primary-600 hover:text-white"
                  )}
                  role="option"
                  aria-selected={value?.id === option.id}
                >
                  <m.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "block truncate font-normal max-w-sm pl-3",
                      value?.id === option.id && "font-semibold"
                    )}
                  >
                    {option.name}
                  </m.span>
                  
                  {value?.id === option.id && (
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 flex items-center pl-1",
                        focusedIndex === idx ? "text-white" : "text-primary-600"
                      )}
                    >
                      <CheckIcon className="w-5 h-5" aria-hidden="true" />
                    </span>
                  )}
                </div>
              ))
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchableCombobox;