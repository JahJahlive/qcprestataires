// Search.jsx
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

export default function Search() {
  const [searchPayload, setSearchPayload] = useState({
    keyword: '',
    category: null,
    subcategory: null,
    subcategory2: [],
    ville: null,
    quartiers: [],
    price_min: 10,
    price_max: 1000,
  });

  const handleSearch = (payload) => {
    setSearchPayload(payload);
  };

  return (
    <div className="page-content">
      <SearchBar onSearch={handleSearch} />
      <SearchResults searchPayload={searchPayload} />
    </div>
  );
}