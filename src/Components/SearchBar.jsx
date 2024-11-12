import React from 'react';

const SearchBar = ({ setSearchInput }) => {
  const handleSearchChange = (e) => setSearchInput(e.target.value);

  return (
    <input 
      type="text" 
      placeholder="Search for a recipe..." 
      onChange={handleSearchChange} 
      className="form-control my-3"
    />
  );
};

export default SearchBar;
