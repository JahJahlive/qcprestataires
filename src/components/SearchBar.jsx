import React, { useEffect, useState, useCallback } from 'react';
import axiosClient from '../axios-client';

function SearchBar({ onSearch, initialPayload }) {
  const [categories, setCategories] = useState([]);
  const [villes, setVilles] = useState([]);
  const [quartiers, setQuartiers] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategories2, setSubcategories2] = useState([]);
  const [displaySubCategory, setDisplaySubCategory] = useState(false);
  const [displaySubCategory2, setDisplaySubCategory2] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchPayload, setSearchPayload] = useState({
    keyword: initialPayload.keyword || '',
    category: initialPayload.category || null,
    subcategory: initialPayload.subcategory || null,
    subcategory2: Array.isArray(initialPayload.subcategory2)
      ? initialPayload.subcategory2
      : initialPayload.subcategory2
      ? [Number(initialPayload.subcategory2)]
      : [],
    ville: initialPayload.ville || null,
    quartiers: initialPayload.quartiers || [],
    price_min: initialPayload.price_min || 10,
    price_max: initialPayload.price_max || 1000,
  });

  // Sync internal searchPayload with initialPayload changes
  useEffect(() => {
    console.log('SearchBar: Syncing with initialPayload:', initialPayload);
    setSearchPayload({
      keyword: initialPayload.keyword || '',
      category: initialPayload.category || null,
      subcategory: initialPayload.subcategory || null,
      subcategory2: Array.isArray(initialPayload.subcategory2)
        ? initialPayload.subcategory2
        : initialPayload.subcategory2
        ? [Number(initialPayload.subcategory2)]
        : [],
      ville: initialPayload.ville || null,
      quartiers: initialPayload.quartiers || [],
      price_min: initialPayload.price_min || 10,
      price_max: initialPayload.price_max || 1000,
    });
  }, [initialPayload]);

  // Trigger initial search only once on mount
  useEffect(() => {
    console.log('SearchBar: Triggering initial search with:', initialPayload);
    onSearch(initialPayload);
  }, []); // Empty dependency array ensures this runs only once

  // Fetch villes
  const getVilles = useCallback(async () => {
    try {
      const { data } = await axiosClient.get('/villes');
      if (!Array.isArray(data)) throw new Error('Invalid villes data format');
      setVilles(data);
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la récupération des villes.');
      console.error('Error fetching villes:', error);
    }
  }, []);

  // Fetch categories
  const getCategories = useCallback(async () => {
    try {
      const { data } = await axiosClient.get('/categories');
      if (!Array.isArray(data)) throw new Error('Invalid categories data format');
      if (data.length === 0) throw new Error('Aucune catégorie disponible.');
      const sub1 = data.flatMap((cat) => cat.children || []);
      const sub2 = sub1.flatMap((child) => child.children || []);
      setCategories(data);
      setSubcategories(sub1);
      setSubcategories2(sub2);
    } catch (error) {
      setError(error.message || 'Erreur lors de la récupération des catégories.');
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load categories and villes on mount
  useEffect(() => {
    getVilles();
    getCategories();
  }, [getVilles, getCategories]);

  // Update dropdown visibility
  useEffect(() => {
    const selectedCategory = categories.find((cat) => cat.id === Number(searchPayload.category));
    setDisplaySubCategory(!!(selectedCategory?.children?.length));
    const selectedSubCategory = subcategories.find(
      (sub) => sub.id === Number(searchPayload.subcategory),
    );
    setDisplaySubCategory2(!!(selectedSubCategory?.children?.length));
  }, [searchPayload.category, searchPayload.subcategory, categories, subcategories]);

  // Update quartiers based on ville
  useEffect(() => {
    const selectedVille = villes.find((ville) => ville.id === Number(searchPayload.ville));
    setQuartiers(selectedVille?.quartiers || []);
    if (!selectedVille) {
      setSearchPayload((prev) => ({ ...prev, quartiers: [] }));
    }
  }, [searchPayload.ville, villes]);

  // Handle select changes
  const handleSelectChange = useCallback(
    (event) => {
      const { name, multiple } = event.target;
      let value;
      if (name === 'subcategory2') {
        value = event.target.value ? [Number(event.target.value)] : [];
      } else if (multiple) {
        value = Array.from(event.target.selectedOptions).map((opt) => Number(opt.value));
      } else {
        value = event.target.value ? Number(event.target.value) : null;
      }

      setSearchPayload((prev) => {
        let newPayload = { ...prev, [name]: value };

        if (name === 'subcategory2') {
          if (value.length > 0) {
            const validSubcategory2 = value.every((id) =>
              subcategories2.find((s) => s.id === id && s.parent_id === Number(prev.subcategory)),
            );
            if (!validSubcategory2) {
              const firstSub2 = subcategories2.find((s) => s.id === value[0]);
              if (firstSub2) {
                newPayload.subcategory = firstSub2.parent_id;
                const parentSub = subcategories.find((s) => s.id === firstSub2.parent_id);
                newPayload.category = parentSub?.parent_id || null;
              }
            }
          }
        } else if (name === 'subcategory') {
          newPayload.subcategory2 = [];
          if (value) {
            const selectedSubcategory = subcategories.find((sub) => sub.id === value);
            if (selectedSubcategory && selectedSubcategory.parent_id !== Number(prev.category)) {
              newPayload.category = selectedSubcategory.parent_id;
            }
          }
        } else if (name === 'category') {
          newPayload.subcategory = null;
          newPayload.subcategory2 = [];
        } else if (name === 'ville') {
          newPayload.quartiers = [];
        }

        console.log('SearchBar: Updated searchPayload:', newPayload);
        return newPayload;
      });
    },
    [subcategories, subcategories2],
  );

  // Handle text input changes
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setSearchPayload((prev) => {
      const newPayload = { ...prev, [name]: value };
      console.log('SearchBar: Updated searchPayload:', newPayload);
      return newPayload;
    });
  }, []);

  // Handle price changes
  const handlePriceChange = useCallback(([min, max]) => {
    const validatedMin = Math.max(0, Number(min));
    const validatedMax = Math.max(validatedMin, Number(max));
    setSearchPayload((prev) => {
      const newPayload = { ...prev, price_min: validatedMin, price_max: validatedMax };
      console.log('SearchBar: Updated searchPayload:', newPayload);
      return newPayload;
    });
  }, []);

  // Handle reset
  const handleReset = useCallback(() => {
    const resetPayload = {
      keyword: '',
      category: null,
      subcategory: null,
      subcategory2: [],
      ville: null,
      quartiers: [],
      price_min: 10,
      price_max: 1000,
    };
    console.log('SearchBar: Resetting with payload:', resetPayload);
    setSearchPayload(resetPayload);
    setError(null);
    onSearch(resetPayload);
  }, [onSearch]);

  // Handle form submission
  const handleSearch = (event) => {
    event.preventDefault();
    console.log('SearchBar: Submitting search with payload:', searchPayload);
    setError(null);
    onSearch(searchPayload);
  };

  if (loading) return <div>Chargement des catégories et villes...</div>;

  return (
    <div className="sf-seach-vertical sf-search-bar-panel">
      {error && (
        <div className="alert alert-danger" id="error-message">
          {error}
          <button type="button" onClick={() => setError(null)} className="btn btn-link" aria-label="Fermer l'erreur">
            Fermer
          </button>
        </div>
      )}
      <form className="search-providers" onSubmit={handleSearch} aria-describedby={error ? 'error-message' : undefined}>
        <div className="sf-searchbar-box">
          <ul className="sf-searchbar-area">
            <li>
              <div className="sf-search-title">
                <span className="sf-search-icon">
                  <img src="images/search-bar/keyword.png" alt="Icône de recherche" />
                </span>
                <label htmlFor="keyword">Mots clés</label>
              </div>
              <input
                type="text"
                value={searchPayload.keyword}
                onChange={handleInputChange}
                placeholder="Que voulez-vous ?"
                id="keyword"
                name="keyword"
                className="form-control sf-form-control"
                aria-label="Recherche par mots-clés"
              />
            </li>
            <li>
              <div className="sf-search-title">
                <label htmlFor="categorysrh">Catégorie</label>
                <span className="sf-search-icon">
                  <img src="images/search-bar/maintenance.png" alt="Icône de catégorie" />
                </span>
              </div>
              <select
                id="categorysrh"
                name="category"
                onChange={handleSelectChange}
                value={searchPayload.category || ''}
                className="form-control sf-form-control aon-categories-select"
                aria-label="Sélectionner une catégorie"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    data-content={`<img class='childcat-img' width='50' height='auto' src=${
                      category.image || 'images/cat-thum/default.jpg'
                    }><span class='childcat'>${category.name}</span>`}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              {displaySubCategory && (
                <select
                  id="subcategorysrh"
                  name="subcategory"
                  onChange={handleSelectChange}
                  value={searchPayload.subcategory || ''}
                  className="form-control sf-form-control aon-categories-select mt-3"
                  aria-label="Sélectionner une sous-catégorie"
                >
                  <option value="">Sélectionner une sous-catégorie</option>
                  {subcategories
                    .filter((category) => Number(searchPayload.category) === category.parent_id)
                    .map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        data-content={`<img class='childcat-img' width='50' height='auto' src=${
                          category.image || 'images/cat-thum/default.jpg'
                        }><span class='childcat'>${category.name}</span>`}
                      >
                        {category.name}
                      </option>
                    ))}
                </select>
              )}
              {displaySubCategory2 && (
                <select
                  id="subcategory2srh"
                  name="subcategory2"
                  onChange={handleSelectChange}
                  value={searchPayload.subcategory2[0] || ''}
                  className="form-control sf-form-control aon-categories-select mt-3"
                  aria-label="Sélectionner un service"
                >
                  <option value="">Sélectionner un service</option>
                  {subcategories2
                    .filter((category) => Number(searchPayload.subcategory) === category.parent_id)
                    .map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        data-content={`<img class='childcat-img' width='50' height='auto' src=${
                          category.image || 'images/cat-thum/default.jpg'
                        }><span class='childcat'>${category.name}</span>`}
                      >
                        {category.name}
                      </option>
                    ))}
                </select>
              )}
            </li>
            <li>
              <div className="sf-search-title">
                <label htmlFor="villesrh">Ville</label>
                <span className="sf-search-icon">
                  <img src="images/search-bar/location.png" alt="Icône de ville" />
                </span>
              </div>
              <select
                id="villesrh"
                name="ville"
                onChange={handleSelectChange}
                value={searchPayload.ville || ''}
                className="form-control sf-form-control"
                aria-label="Sélectionner une ville"
              >
                <option value="">Sélectionner une ville</option>
                {villes.map((ville) => (
                  <option key={ville.id} value={ville.id}>
                    {ville.name}
                  </option>
                ))}
              </select>
            </li>
            {quartiers.length > 0 && (
              <li>
                <div className="sf-search-title">
                  <label htmlFor="quartiersrh">Quartiers</label>
                  <span className="sf-search-icon">
                    <img src="images/search-bar/location.png" alt="Icône de quartier" />
                  </span>
                </div>
                <select
                  id="quartiersrh"
                  name="quartiers"
                  multiple
                  onChange={handleSelectChange}
                  value={searchPayload.quartiers.map(String)}
                  className="form-control sf-form-control mt-3"
                  aria-label="Sélectionner des quartiers"
                >
                  {quartiers.map((quartier) => (
                    <option key={quartier.id} value={quartier.id}>
                      {quartier.name}
                    </option>
                  ))}
                </select>
              </li>
            )}
            <li>
              <button
                type="submit"
                className="site-button sf-search-btn text-white"
                aria-label="Lancer la recherche"
              >
                <i className="fa fa-search"></i> Filtrer
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="site-button sf-reset-btn text-white mt-2"
                aria-label="Réinitialiser les filtres"
              >
                Réinitialiser
              </button>
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;