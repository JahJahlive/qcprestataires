import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchPayload, setSearchPayload] = useState({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') ? Number(searchParams.get('category')) : null,
    subcategory: searchParams.get('subcategory') ? Number(searchParams.get('subcategory')) : null,
    subcategory2: searchParams.get('subcategory2')
      ? searchParams.get('subcategory2').split(',').map(Number)
      : [],
    ville: searchParams.get('ville') ? Number(searchParams.get('ville')) : null,
    quartiers: searchParams.get('quartiers')
      ? searchParams.get('quartiers').split(',').map(Number)
      : [],
    price_min: searchParams.get('price_min') ? Number(searchParams.get('price_min')) : 10,
    price_max: searchParams.get('price_max') ? Number(searchParams.get('price_max')) : 1000,
  });

  // Handle search updates and update URL
  const handleSearch = (payload) => {
    console.log('Search: Handling search with payload:', payload);
    const params = {};
    if (payload.keyword) params.keyword = payload.keyword;
    if (payload.category) params.category = payload.category;
    if (payload.subcategory) params.subcategory = payload.subcategory;
    if (payload.subcategory2.length > 0) params.subcategory2 = payload.subcategory2.join(',');
    if (payload.ville) params.ville = payload.ville;
    if (payload.quartiers.length > 0) params.quartiers = payload.quartiers.join(',');
    if (payload.price_min !== 10) params.price_min = payload.price_min;
    if (payload.price_max !== 1000) params.price_max = payload.price_max;

    setSearchParams(params, { replace: true });
    setSearchPayload(payload);
  };

  return (
    <div className="page-content">
      <SearchBar onSearch={handleSearch} initialPayload={searchPayload} />
      <SearchResults searchPayload={searchPayload} />
    </div>
  );
}