import React, { useState } from "react";

interface FilterProps {
  onFilterChange: (filter: string) => void;
  minCharacters?: number;
}

const Filter: React.FC<FilterProps> = ({
  onFilterChange,
  minCharacters = 3,
}) => {
  const [filter, setFilter] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    if (value.length >= minCharacters || value === "") {
      onFilterChange(value);
    }
  };
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="filter" className="text-retroYellow">
        Filter:
      </label>
      <input
        id="filter"
        type="text"
        value={filter}
        onChange={(e) => handleChange(e)}
        className="px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-retroGreen"
        placeholder={`Enter at least ${minCharacters} characters...`}
      />
    </div>
  );
};

export default Filter;
