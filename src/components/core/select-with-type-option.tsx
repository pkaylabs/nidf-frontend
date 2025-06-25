import React, { useState, useEffect, useRef } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { cn } from "@/utils/cs";

interface CustomDropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  showOthersOption?: boolean;
  othersLabel?: string;
  othersPlaceholder?: string;
}

const DropdownWithOtherOption: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  className,
  showOthersOption = true,
  othersLabel = "Others",
  othersPlaceholder = "Type your custom option...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOthersInputActive, setIsOthersInputActive] = useState(false);
  const [customInputValue, setCustomInputValue] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  const allOptions = showOthersOption 
    ? [...options, { label: othersLabel, value: "__others__" }]
    : options;

  const isCustomValue = value && !options.some(opt => opt.value === value);


  const getDisplayValue = () => {
    if (isCustomValue) {
      return value;
    }
    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : "Select an option";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOthersInputActive && customInputValue.trim()) {
         
          onChange(customInputValue);
        }
        setIsOpen(false);
        setIsOthersInputActive(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOthersInputActive, customInputValue, onChange]);

  useEffect(() => {
    if (isOpen && isCustomValue) {
      setCustomInputValue(value);
    }
  }, [isOpen, isCustomValue, value]);

  useEffect(() => {
    if (isOthersInputActive && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOthersInputActive]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    setFocusedIndex(-1);
    if (!isOpen && isCustomValue) {
      setCustomInputValue(value);
    }
  };

  const handleOptionClick = (option: { label: string; value: string }, index: number) => {
    if (option.value === "__others__") {
      setIsOthersInputActive(true);
      setCustomInputValue(isCustomValue ? value : "");
      setFocusedIndex(index);
      return;
    }

    onChange(option.value);
    setIsOpen(false);
    setIsOthersInputActive(false);
    setFocusedIndex(-1);
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCustomInputValue(inputValue);
  };

  const handleCustomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    
    if (e.key === "Enter") {
      e.preventDefault();
      if (customInputValue.trim()) {
        onChange(customInputValue.trim());
        setIsOpen(false);
        setIsOthersInputActive(false);
        setFocusedIndex(-1);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      setIsOthersInputActive(false);
      setFocusedIndex(-1);
    }
  };

  const handleCustomInputBlur = () => {
    setTimeout(() => {
      if (customInputValue.trim()) {
        onChange(customInputValue.trim());
      }
      setIsOthersInputActive(false);
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    if (isOthersInputActive) return;

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % allOptions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex(prev => prev <= 0 ? allOptions.length - 1 : prev - 1);
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleOptionClick(allOptions[focusedIndex], focusedIndex);
        }
        break;
    }
  };

  return (
    <div ref={dropdownRef} className="relative flex-1" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleButtonClick}
        className={cn(
          "font-poppins font-light w-full cursor-default flex flex-1 justify-between items-center rounded-md bg-white py-3 pr-2 pl-3 text-left text-[#324054] border border-[#71839B] focus:outline-none sm:text-sm md:text-base xl:text-lg",
          className
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate pr-6 max-w-sm">
          {getDisplayValue()}
        </span>
        <ChevronUpDownIcon
          aria-hidden="true"
          className={cn(
            "size-5 self-center justify-self-end text-gray-500 sm:size-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-none sm:text-sm"
          >
            {allOptions.map((option, idx) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option, idx)}
                className={cn(
                  "relative cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none hover:bg-primary-600 hover:text-white transition-colors duration-150",
                  focusedIndex === idx && "bg-primary-600 text-white",
                  value === option.value && option.value !== "__others__" && "font-semibold"
                )}
                role="option"
                aria-selected={value === option.value && option.value !== "__others__"}
              >
                {option.value === "__others__" && isOthersInputActive && focusedIndex === idx ? (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={customInputValue}
                      onChange={handleCustomInputChange}
                      onKeyDown={handleCustomInputKeyDown}
                      onBlur={handleCustomInputBlur}
                      placeholder={othersPlaceholder}
                      className="w-full bg-transparent border-none outline-none focus:outline-none focus:border-none text-white placeholder-gray-200 focus:text-white"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </m.div>
                ) : (
                  <m.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="block truncate font-normal max-w-sm"
                  >
                    {option.value === "__others__" && isCustomValue ? customInputValue || value : option.label}
                  </m.span>
                )}
              </div>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownWithOtherOption;