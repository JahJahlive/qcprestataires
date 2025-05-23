import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { debounce } from 'lodash';

function SearchResults({ searchPayload }) {
  const [providers, setProviders] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    perPage: 9,
  });
  const [filters, setFilters] = useState({
    orderBy: 'rating',
    order: 'desc',
    perPage: 9,
  });
  const [viewType, setViewType] = useState('grid-2');

  const fetchSearchResults = debounce(async (page) => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        ...searchPayload,
        page,
        order_by: filters.orderBy,
        order: filters.order,
        per_page: filters.perPage,
      };
      console.log('Fetching providers with params:', params); // Debug
      const response = await axiosClient.get('/providers', { params });
      console.log('API response:', response.data); // Debug
      if (!Array.isArray(response.data.data)) {
        throw new Error('Invalid providers data format');
      }
      setProviders(response.data.data);
      setTotalResults(response.data.total || 0);
      setPagination((prev) => {
        const newPagination = {
          ...prev,
          currentPage: page,
          totalPages: response.data.last_page || 1,
        };
        console.log('Updated pagination:', newPagination); // Debug
        return newPagination;
      });
    } catch (error) {
      console.error('Error fetching providers:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Une erreur est survenue lors de la recherche. Veuillez réessayer.';
      setError(errorMessage);
      setProviders([]);
      setTotalResults(0);
      setPagination((prev) => ({ ...prev, currentPage: 1, totalPages: 1 }));
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    console.log('searchPayload changed:', searchPayload); // Debug
    // Reset currentPage to 1 and fetch results
    setPagination((prev) => {
      const newPagination = { ...prev, currentPage: 1 };
      console.log('Reset pagination to page 1:', newPagination); // Debug
      fetchSearchResults(1); // Fetch page 1 immediately
      return newPagination;
    });
  }, [searchPayload]);

  useEffect(() => {
    // Fetch results when filters or currentPage change
    console.log('Fetching due to filters or currentPage change:', { filters, currentPage: pagination.currentPage }); // Debug
    fetchSearchResults(pagination.currentPage);
  }, [filters, pagination.currentPage]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: name === 'perPage' ? Number(value) : value,
    }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleViewChange = (view) => {
    setViewType(view);
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleFavorite = async (providerId) => {
    try {
      console.log(`Adding provider ${providerId} to favorites`);
      // TODO: Implement API call, e.g., await axiosClient.post('/favorites', { providerId });
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const getQuartiersByVille = (quartiers) => {
    const grouped = quartiers.reduce((acc, { ville, quartier }) => {
      if (!acc[ville.name]) {
        acc[ville.name] = [];
      }
      acc[ville.name].push(quartier.name);
      return acc;
    }, {});
    return Object.entries(grouped)
      .map(([ville, quartiers]) => `${ville}: ${quartiers.join(', ')}`)
      .join(' | ');
  };

  // Calculate results range for display
  const startResult = providers.length > 0 ? (pagination.currentPage - 1) * filters.perPage + 1 : 0;
  const endResult = Math.min(startResult + providers.length - 1, totalResults);

  const maxPagesToShow = 5;
  const startPage = Math.max(1, pagination.currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(pagination.totalPages, startPage + maxPagesToShow - 1);
  const pages = [...Array(endPage - startPage + 1).keys()].map((i) => startPage + i);

  return (
    <div className="aon-search-result-area mt-5">
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
      <div className="sf-search-result-top flex-wrap d-flex justify-content-between align-items-center">
        <div className="sf-search-result-title">
          <h5>
            Affichage de {startResult} – {endResult} sur {totalResults} résultats
          </h5>
        </div>
        <div className="sf-search-result-option">
          <ul className="sf-search-sortby">
            <li className="sf-select-sort-by">
              <select
                className="sf-select-box form-control sf-form-control"
                name="orderBy"
                id="orderBy"
                value={filters.orderBy}
                onChange={handleFilterChange}
                aria-label="Trier par"
              >
                <option value="">TRIER PAR</option>
                <option value="rating">Note</option>
                <option value="name">Nom</option>
                <option value="distance">Distance</option>
              </select>
            </li>
            <li>
              <select
                className="sf-select-box form-control sf-form-control"
                name="order"
                id="order"
                value={filters.order}
                onChange={handleFilterChange}
                aria-label="Ordre de tri"
              >
                <option value="desc">DESC</option>
                <option value="asc">ASC</option>
              </select>
            </li>
            <li>
              <select
                className="sf-select-box form-control sf-form-control"
                name="perPage"
                id="perPage"
                value={filters.perPage}
                onChange={handleFilterChange}
                aria-label="Résultats par page"
              >
                <option value="9">9</option>
                <option value="12">12</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>
            </li>
          </ul>
          <ul className="sf-search-grid-option" id="viewTypes">
            <li data-view="grid-2" className={viewType === 'grid-2' ? 'active' : ''}>
              <button
                type="button"
                className="btn btn-border btn-icon"
                onClick={() => handleViewChange('grid-2')}
                aria-label="Affichage en grille"
              >
                <i className="fa fa-th"></i>
              </button>
            </li>
            <li data-view="listview" className={viewType === 'listview' ? 'active' : ''}>
              <button
                type="button"
                className="btn btn-border btn-icon"
                onClick={() => handleViewChange('listview')}
                aria-label="Affichage en liste"
              >
                <i className="fa fa-th-list"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="sf-map-filter">
        <button className="search-filter-btn btn site-button" type="button" aria-label="Ouvrir les filtres de recherche">
          <i className="fa fa-sliders"></i> Filtre de recherche
        </button>
      </div>

      <div className={`provider-grid ${viewType === 'grid-2' ? 'grid-2' : 'grid-1'}`}>
        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : providers.length === 0 ? (
          <div className="text-center">Aucun prestataire trouvé.</div>
        ) : (
          providers.map((provider) => (
            <div className="provider-item" key={provider.id}>
              <div className="aon-vender-list-wrap3">
                <div className="aon-vender-list-box3 d-flex">
                  <div
                    className="aon-vender-list-pic"
                    style={{
                      backgroundImage: `url(${
                        provider.profile_picture || 'images/vender-list/default.jpg'
                      })`,
                    }}
                  >
                    <a
                      className="aon-vender-pic-link"
                      href={`/profile/${provider.id}`}
                      aria-label={`Voir le profil de ${provider.name}`}
                    ></a>
                  </div>
                  <div className="aon-vender-list-info">
                    <h4 className="aon-venders-title">
                      <a href={`/profile/${provider.id}`}>{provider.name}</a>
                    </h4>
                    <span className="aon-venders-address">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                      {provider.quartiers && provider.quartiers.length > 0
                        ? getQuartiersByVille(provider.quartiers)
                        : 'Aucun quartier spécifié'}
                    </span>
                    <div className="aon-ow-pro-rating">
                      {Array.from({ length: provider.rating || 0 }, (_, i) => (
                        <span key={i} className="fa fa-star" aria-hidden="true"></span>
                      ))}
                      {Array.from({ length: 5 - (provider.rating || 0) }, (_, i) => (
                        <span
                          key={i + (provider.rating || 0)}
                          className="fa fa-star text-gray"
                          aria-hidden="true"
                        ></span>
                      ))}
                    </div>
                    <p className="provider-description">
                      {provider.description || 'Aucune description disponible'}
                    </p>
                    <div className="aon-pro-check">
                      <span>
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </span>
                    </div>
                    <div className="aon-pro-favorite">
                      <button
                        onClick={() => handleFavorite(provider.id)}
                        aria-label={`Ajouter ${provider.name} aux favoris`}
                      >
                        <i className="fa fa-heart-o" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div className="aon-req-btn">
                      <a
                        className="aon-req-btn-posi"
                        href={`/profile/${provider.id}`}
                        aria-label={`Demander un devis à ${provider.name}`}
                      >
                        Demander un devis
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="site-pagination s-p-center">
        <ul className="pagination">
          <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              aria-label="Page précédente"
            >
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </button>
          </li>
          {pages.map((page) => (
            <li
              key={page}
              className={`page-item ${pagination.currentPage === page ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              pagination.currentPage === pagination.totalPages ? 'disabled' : ''
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              aria-label="Page suivante"
            >
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SearchResults;