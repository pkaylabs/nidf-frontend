import { SearchNormal1 } from "iconsax-react";
import React from "react";

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onChange }) => {
  return (
    <div className="flex-[0.8] flex items-center space-x-2 px-4 py-2.5 border border-[#71839B] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <SearchNormal1 size="20" color="#71839B"/>
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="flex-1 w-full bg-transparent outline-none text-[#324054] text-sm md:text-base xl:text-lg"    
      />
    </div>
  );
};

export default SearchBar;
