import React, { useEffect, useState, useCallback } from 'react';
import axiosClient from '../axios-client';
import { debounce } from 'lodash';

function SearchBar({ onSearch }) {
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
        keyword: '',
        category: null,
        subcategory: null,
        subcategory2: [],
        ville: null,
        quartiers: [],
        price_min: 10,
        price_max: 1000,
    });

    // Fetch villes from the backend
    const getVilles = async () => {
        try {
            const { data } = await axiosClient.get('/villes');
            if (!Array.isArray(data)) {
                throw new Error('Invalid villes data format');
            }
            setVilles(data);
        } catch (error) {
            setError(error.response?.data?.message || 'Erreur lors de la récupération des villes.');
            console.error('Error fetching villes:', error);
        }
    };

    // Fetch categories and flatten hierarchy for subcategories
    const getCategories = async () => {
        try {
            const { data } = await axiosClient.get('/categories');
            if (!Array.isArray(data)) {
                throw new Error('Invalid categories data format');
            }
            if (data.length === 0) {
                setError('Aucune catégorie disponible. Veuillez contacter l’administrateur.');
            }
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
    };

    // Debounce search payload updates for text inputs
    const debouncedSetSearchPayload = debounce((payload) => {
        setSearchPayload(payload);
    }, 300);

    // Handle select input changes
    const handleSelectChange = useCallback((event) => {
        const { name, multiple } = event.target;
        const value = multiple
            ? Array.from(event.target.selectedOptions).map((option) => Number(option.value))
            : event.target.value ? Number(event.target.value) : null;

        let newPayload = { ...searchPayload, [name]: value };

        if (name === 'subcategory2') {
            if (value.length > 0) {
                const validSubcategory2 = value.every((id) => {
                    const sub2 = subcategories2.find((s) => s.id === id);
                    return sub2 && sub2.parent_id === Number(searchPayload.subcategory);
                });
                if (!validSubcategory2) {
                    const firstSub2 = subcategories2.find((s) => s.id === value[0]);
                    if (firstSub2) {
                        newPayload.subcategory = firstSub2.parent_id;
                        const parentSub = subcategories.find((s) => s.id === firstSub2.parent_id);
                        newPayload.category = parentSub ? parentSub.parent_id : null;
                    }
                }
            }
        } else if (name === 'subcategory') {
            if (value) {
                const selectedSubcategory = subcategories.find((sub) => sub.id === value);
                if (selectedSubcategory && selectedSubcategory.parent_id !== Number(searchPayload.category)) {
                    newPayload.category = selectedSubcategory.parent_id;
                }
            }
            newPayload.subcategory2 = [];
        } else if (name === 'category') {
            newPayload.subcategory = null;
            newPayload.subcategory2 = [];
        }

        setSearchPayload(newPayload);
    }, [searchPayload, subcategories, subcategories2]);

    // Handle text input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        debouncedSetSearchPayload({ ...searchPayload, [name]: value });
    };

    // Handle price range changes
    const handlePriceChange = useCallback(([min, max]) => {
        const validatedMin = Math.max(0, Number(min));
        const validatedMax = Math.max(validatedMin, Number(max));
        setSearchPayload((prev) => ({ ...prev, price_min: validatedMin, price_max: validatedMax }));
    }, []);

    // Reset form
    const handleReset = useCallback(() => {
        setSearchPayload({
            keyword: '',
            category: null,
            subcategory: null,
            subcategory2: [],
            ville: null,
            quartiers: [],
            price_min: 10,
            price_max: 1000,
        });
        setDisplaySubCategory(false);
        setDisplaySubCategory2(false);
        setError(null);
    }, []);

    // Load categories and villes on mount
    useEffect(() => {
        getCategories();
        getVilles();
    }, []);

    // Update subcategory dropdown visibility
    useEffect(() => {
        setDisplaySubCategory(false);
        setDisplaySubCategory2(false);
        if (searchPayload.category && !searchPayload.subcategory && !searchPayload.subcategory2.length) {
            const selectedCategory = categories.find(
                (cat) => cat.id === Number(searchPayload.category)
            );
            if (selectedCategory?.children?.length) {
                setDisplaySubCategory(true);
            }
        }
    }, [searchPayload.category, categories]);

    // Update subcategory2 dropdown visibility
    useEffect(() => {
        setDisplaySubCategory2(false);
        if (searchPayload.subcategory && !searchPayload.subcategory2.length) {
            const selectedSubCategory = subcategories.find(
                (cat) => cat.id === Number(searchPayload.subcategory)
            );
            if (selectedSubCategory?.children?.length) {
                setDisplaySubCategory2(true);
            }
        }
    }, [searchPayload.subcategory, subcategories]);

    // Update quartiers based on selected ville
    useEffect(() => {
        setQuartiers([]);
        setSearchPayload((prev) => ({ ...prev, quartiers: [] }));
        if (searchPayload.ville) {
            const selectedVille = villes.find(
                (ville) => ville.id === Number(searchPayload.ville)
            );
            setQuartiers(selectedVille?.quartiers || []);
        }
    }, [searchPayload.ville, villes]);

    // Trigger search on form submission
    const handleSearch = (event) => {
        event.preventDefault();
        setError(null);
        onSearch(searchPayload);
    };

    if (loading) {
        return <div>Chargement des catégories et villes...</div>;
    }

    return (
        <div className="sf-seach-vertical sf-search-bar-panel">
            {error && (
                <div className="alert alert-danger" id="error-message">
                    {error}
                    <button
                        type="button"
                        onClick={() => setError(null)}
                        className="btn btn-link"
                        aria-label="Fermer l'erreur"
                    >
                        Fermer
                    </button>
                </div>
            )}
            <form className="search-providers" onSubmit={handleSearch} aria-describedby={error ? 'error-message' : undefined}>
                <div className="sf-searchbar-box">
                    <ul className="sf-searchbar-area">
                        {/* Keyword Input */}
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

                        {/* Category Select */}
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

                            {/* Subcategory Select */}
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

                            {/* Subcategory2 Select */}
                            {displaySubCategory2 && (
                                <select
                                    id="subcategory2srh"
                                    name="subcategory2"
                                    multiple
                                    onChange={handleSelectChange}
                                    value={searchPayload.subcategory2}
                                    className="form-control sf-form-control aon-categories-select mt-3"
                                    aria-label="Sélectionner des services"
                                >
                                    <option value="" disabled>Sélectionner un service</option>
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

                        {/* Ville Select */}
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

                        {/* Quartiers Select */}
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
                                    value={searchPayload.quartiers}
                                    className="form-control sf-form-control mt-3"
                                    aria-label="Sélectionner des quartiers"
                                >
                                    <option value="" disabled>Sélectionner un quartier</option>
                                    {quartiers.map((quartier) => (
                                        <option key={quartier.id} value={quartier.id}>
                                            {quartier.name}
                                        </option>
                                    ))}
                                </select>
                            </li>
                        )}

                        {/* Price Range Inputs */}
                        {/* <li>
                            <div className="sf-search-title">
                                <label>Prix</label>
                                <span className="sf-search-icon">
                                    <img src="images/search-bar/price.png" alt="Icône de prix" />
                                </span>
                            </div>
                            <div className="price-range-inputs">
                                <input
                                    type="number"
                                    name="price_min"
                                    value={searchPayload.price_min}
                                    onChange={(e) =>
                                        handlePriceChange([Number(e.target.value), searchPayload.price_max])
                                    }
                                    placeholder="Min"
                                    className="form-control sf-form-control"
                                    min="0"
                                    aria-label="Prix minimum"
                                />
                                <input
                                    type="number"
                                    name="price_max"
                                    value={searchPayload.price_max}
                                    onChange={(e) =>
                                        handlePriceChange([searchPayload.price_min, Number(e.target.value)])
                                    }
                                    placeholder="Max"
                                    className="form-control sf-form-control mt-2"
                                    min="0"
                                    aria-label="Prix maximum"
                                />
                            </div>
                        </li> */}

                        {/* Submit and Reset Buttons */}
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