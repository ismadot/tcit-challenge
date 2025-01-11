import React, { useState } from "react";

interface FilterProps {
  onFilterChange: (filter: string) => void;
  onPerPageChange: (perPage: number) => void;
  minCharacters?: number;
}

const Filter: React.FC<FilterProps> = ({
  onFilterChange,
  onPerPageChange,
  minCharacters = 3,
}) => {
  const [filter, setFilter] = useState("");
  const [perPage, setPerPage] = useState(10);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    if (value.length >= minCharacters || value === "") {
      onFilterChange(value);
    }
  };
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setPerPage(value);
    onPerPageChange(value); // Update perPage state in PostsPage
  };
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="filter" className="text-retroYellow">
          Filter 🔎:
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
      <div className="flex items-center space-x-2">
        <label htmlFor="perPage" className="text-retroYellow">
          Per Page 📄:
        </label>
        <select
          id="perPage"
          onChange={handlePerPageChange}
          value={perPage}
          className="px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-retroGreen"
          defaultValue={10}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
