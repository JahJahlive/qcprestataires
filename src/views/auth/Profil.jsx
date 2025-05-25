// src/Profile.jsx
import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../../config'; // Import from config.js

function Profile() {
  // State for all form sections
  const [formData, setFormData] = useState({
    username: '',
    companyName: '',
    firstName: '',
    lastName: '',
    gender: '',
    slogan: '',
    biography: '',
    mobile: '',
    alternateMobile: '',
    email: '',
    skype: '',
    website: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    latitude: 4.051056, // Default coordinates (Douala, Cameroon)
    longitude: 9.767868,
    facebook: '',
    twitter: '',
    linkedin: '',
    pinterest: '',
    digg: '',
    instagram: '',
    newPassword: '',
    confirmPassword: '',
    categories: [],
    mainCategory: '',
    amenities: [],
    videoUrl: '',
  });

  // State for file uploads
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  // State for loading and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // State for Autocomplete instance
  const [autocomplete, setAutocomplete] = useState(null);

  // State for map zoom level
  const [mapZoom, setMapZoom] = useState(15); // Default zoom level

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle zoom input change
  const handleZoomChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 20) {
      setMapZoom(value);
    }
  };

  // Handle select multiple (categories, amenities)
  const handleSelectChange = (name, selectedOptions) => {
    const values = Array.from(selectedOptions).map((option) => option.value);
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  // Handle file inputs (avatar, cover image)
  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  // Handle gallery files with react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg,image/png,image/gif',
    onDrop: (acceptedFiles) => {
      setGalleryFiles((prev) => [...prev, ...acceptedFiles]);
    },
  });

  // Handle marker drag or map click to update address
  const handleMarkerDragEnd = useCallback(
    async (event) => {
      if (!GOOGLE_MAPS_API_KEY) {
        setError('Clé API Google Maps manquante.');
        return;
      }
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();

        if (data.status === 'OK' && data.results[0]) {
          const addressComponents = data.results[0].address_components;
          const formattedAddress = data.results[0].formatted_address;

          let address = '';
          let city = '';
          let state = '';
          let postalCode = '';
          let country = '';

          addressComponents.forEach((component) => {
            if (component.types.includes('street_number') || component.types.includes('route')) {
              address += component.long_name + ' ';
            } else if (component.types.includes('locality')) {
              city = component.long_name;
            } else if (component.types.includes('administrative_area_level_1')) {
              state = component.long_name;
            } else if (component.types.includes('postal_code')) {
              postalCode = component.long_name;
            } else if (component.types.includes('country')) {
              country = component.long_name;
            }
          });

          setFormData((prev) => ({
            ...prev,
            address: address.trim() || formattedAddress,
            city,
            state,
            postalCode,
            country,
            latitude: lat,
            longitude: lng,
          }));
        } else {
          setError('Impossible de récupérer l\'adresse pour cette position.');
        }
      } catch (err) {
        setError('Erreur lors de la récupération de l\'adresse.');
      }
    },
    [GOOGLE_MAPS_API_KEY]
  );

  // Handle "Trouver l'adresse" button to geocode address
  const handleGeocodeAddress = useCallback(
    async () => {
      if (!GOOGLE_MAPS_API_KEY) {
        setError('Clé API Google Maps manquante.');
        return;
      }
      const fullAddress = [
        formData.address,
        formData.apartment,
        formData.city,
        formData.state,
        formData.postalCode,
        formData.country,
      ]
        .filter(Boolean)
        .join(', ');

      if (!fullAddress) {
        setError('Veuillez entrer une adresse valide.');
        return;
      }

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            fullAddress
          )}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();

        if (data.status === 'OK' && data.results[0]) {
          const { lat, lng } = data.results[0].geometry.location;
          setFormData((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
          }));
        } else {
          setError('Adresse introuvable. Veuillez vérifier les détails.');
        }
      } catch (err) {
        setError('Erreur lors de la géolocalisation de l\'adresse.');
      }
    },
    [formData, GOOGLE_MAPS_API_KEY]
  );

  // Handle Autocomplete place selection
  const handlePlaceSelected = useCallback(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      setError('Clé API Google Maps manquante.');
      return;
    }
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const addressComponents = place.address_components;

        let address = '';
        let city = '';
        let state = '';
        let postalCode = '';
        let country = '';

        addressComponents.forEach((component) => {
          if (component.types.includes('street_number') || component.types.includes('route')) {
            address += component.long_name + ' ';
          } else if (component.types.includes('locality')) {
            city = component.long_name;
          } else if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
          } else if (component.types.includes('postal_code')) {
            postalCode = component.long_name;
          } else if (component.types.includes('country')) {
            country = component.long_name;
          }
        });

        setFormData((prev) => ({
          ...prev,
          address: address.trim() || place.formatted_address,
          city,
          state,
          postalCode,
          country,
          latitude: lat,
          longitude: lng,
        }));
      } else {
        setError('Lieu sélectionné sans coordonnées. Veuillez choisir une adresse valide.');
      }
    }
  }, [autocomplete, GOOGLE_MAPS_API_KEY]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          data.append(`${key}[${index}]`, item);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    if (avatar) data.append('avatar', avatar);
    if (coverImage) data.append('coverImage', coverImage);
    galleryFiles.forEach((file, index) => {
      data.append(`gallery[${index}]`, file);
    });

    try {
      const response = await axios.post('http://your-laravel-api.com/api/profile/update', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add authorization header if needed, e.g., 'Authorization': `Bearer ${token}`
        },
      });

      setSuccess('Profil mis à jour avec succès !');
      setFormData((prev) => ({
        ...prev,
        newPassword: '',
        confirmPassword: '',
      }));
      setAvatar(null);
      setCoverImage(null);
      setGalleryFiles([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  // Map container style
  const mapContainerStyle = {
    height: '460px',
    width: '100%',
  };

  // Center map on current coordinates
  const center = {
    lat: parseFloat(formData.latitude) || 4.051056,
    lng: parseFloat(formData.longitude) || 9.767868,
  };

  // Memoize the GoogleMap component
  const map = useMemo(
    () => (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={mapZoom} // Use configurable zoom
        onClick={handleMarkerDragEnd}
      >
        <Marker position={center} draggable={true} onDragEnd={handleMarkerDragEnd} />
      </GoogleMap>
    ),
    [center, mapZoom, handleMarkerDragEnd]
  );

  // Check for missing API key
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="alert alert-danger">
        Erreur : La clé API Google Maps n'est pas configurée. Veuillez ajouter
        REACT_APP_GOOGLE_MAPS_API_KEY ou VITE_GOOGLE_MAPS_API_KEY dans le fichier .env et redémarrer le serveur.
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="aon-provi-tabs d-flex flex-wrap justify-content-between">
        <div className="aon-provi-left">
          <ul className="aon-provi-links">
            <li><a href="#aon-about-panel">À propos</a></li>
            <li><a href="#aon-contact-panel">Contact</a></li>
            <li><a href="#aon-adress-panel">Adresse</a></li>
            <li><a href="#aon-socialMedia-panel">Médias sociaux</a></li>
            <li><a href="#aon-passUpdate-panel">Mot de passe</a></li>
            <li><a href="#aon-category-panel">Catégorie</a></li>
            <li><a href="#aon-amenities-panel">Équipements</a></li>
            <li><a href="#aon-gallery-panel">Galerie</a></li>
            <li><a href="#aon-video-panel">Vidéo</a></li>
          </ul>
        </div>
        <div className="aon-provi-right"></div>
      </div>

      <div className="aon-admin-heading">
        <h4>Modifier le profil</h4>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* About Section */}
        <div className="card aon-card" id="aon-about-panel">
          <div className="card-header aon-card-header">
            <h4>
              <i className="fa fa-user"></i> À propos de moi
            </h4>
          </div>
          <div className="card-body aon-card-body">
            <div className="row">
              <div className="col-xl-6">
                <div className="aon-staff-avtar">
                  <div className="aon-staff-avtar-header">
                    <div className="aon-pro-avtar-pic">
                      <img
                        src={avatar ? URL.createObjectURL(avatar) : 'images/pic-large.jpg'}
                        alt="Avatar"
                      />
                      <label className="admin-button has-toltip">
                        <i className="fa fa-camera"></i>
                        <span className="header-toltip">Télécharger un avatar</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/gif"
                          onChange={(e) => handleFileChange(e, setAvatar)}
                          aria-label="Télécharger un avatar"
                        />
                      </label>
                    </div>
                    <div className="aon-pro-cover-wrap">
                      <div className="aon-pro-cover-pic">
                        <img
                          src={
                            coverImage
                              ? URL.createObjectURL(coverImage)
                              : 'images/banner/job-banner.jpg'
                          }
                          alt="Cover"
                        />
                      </div>
                      <label className="admin-button-upload">
                        <span>Télécharger une image de couverture</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/gif"
                          onChange={(e) => handleFileChange(e, setCoverImage)}
                          aria-label="Télécharger une image de couverture"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="aon-staff-avtar-footer">
                    <h4 className="aon-staff-avtar-title">Téléchargez votre avatar</h4>
                    <ul>
                      <li>
                        Largeur et hauteur minimum : <span>600 x 600 px</span>
                      </li>
                      <li>
                        Taille maximale de téléchargement : <span>512 Mo</span>
                      </li>
                      <li>
                        Extensions : <span>JPEG, PNG, GIF</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="username">Nom d'utilisateur</label>
                      <div className="aon-inputicon-box">
                        <input
                          id="username"
                          className="form-control sf-form-control"
                          name="username"
                          type="text"
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                        />
                        <i className="aon-input-icon fa fa-user"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="companyName">Nom de l'entreprise</label>
                      <div className="aon-inputicon-box">
                        <input
                          id="companyName"
                          className="form-control sf-form-control"
                          name="companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={handleInputChange}
                        />
                        <i className="aon-input-icon fa fa-building-o"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName">Prénom</label>
                      <div className="aon-inputicon-box">
                        <input
                          id="firstName"
                          className="form-control sf-form-control"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                        <i className="aon-input-icon fa fa-user"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastName">Nom de famille</label>
                      <div className="aon-inputicon-box">
                        <input
                          id="lastName"
                          className="form-control sf-form-control"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                        <i className="aon-input-icon fa fa-user"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 breck-w1400">
                    <div className="form-group">
                      <label>Genre</label>
                      <div className="aon-inputicon-box">
                        <div className="radio-inline-box sf-radio-check-row">
                          <div className="checkbox sf-radio-checkbox sf-radio-check-2 sf-raChe-6">
                            <input
                              id="male"
                              name="gender"
                              value="male"
                              type="radio"
                              checked={formData.gender === 'male'}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="male">Homme</label>
                          </div>
                          <div className="checkbox sf-radio-checkbox sf-radio-check-2 sf-raChe-6">
                            <input
                              id="female"
                              name="gender"
                              value="female"
                              type="radio"
                              checked={formData.gender === 'female'}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="female">Femme</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 breck-w1400">
                    <div className="form-group">
                      <label htmlFor="slogan">Slogan</label>
                      <div className="aon-inputicon-box">
                        <input
                          id="slogan"
                          className="form-control sf-form-control"
                          name="slogan"
                          type="text"
                          value={formData.slogan}
                          onChange={handleInputChange}
                        />
                        <i className="aon-input-icon fa fa-tags"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="biography">Biographie</label>
                      <div className="editer-wrap">
                        <textarea
                          id="biography"
                          className="form-control"
                          name="biography"
                          rows="4"
                          value={formData.biography}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="card aon-card" id="aon-contact-panel">
          <div className="card-header aon-card-header">
            <h4>
              <i className="fa fa-envelope"></i> Détails de contact
            </h4>
          </div>
          <div className="card-body aon-card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="mobile">Mobile</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="mobile"
                      className="form-control sf-form-control"
                      name="mobile"
                      type="text"
                      value={formData.mobile}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-phone"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="alternateMobile">Mobile alternatif</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="alternateMobile"
                      className="form-control sf-form-control"
                      name="alternateMobile"
                      type="text"
                      value={formData.alternateMobile}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-mobile"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Adresse e-mail</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="email"
                      className="form-control sf-form-control"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-envelope"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="skype">Skype</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="skype"
                      className="form-control sf-form-control"
                      name="skype"
                      type="text"
                      value={formData.skype}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-skype"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="website">Site web</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="website"
                      className="form-control sf-form-control"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-globe"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="card aon-card" id="aon-adress-panel">
          <div className="card-header aon-card-header">
            <h4>
              <i className="fa fa-address-card"></i> Adresse
            </h4>
          </div>
          <div className="card-body aon-card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Emplacement</label>
                  <div className="grayscle-area address-area-map">
                    <LoadScript
                      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                      libraries={['places']} // Required for Autocomplete
                    >
                      <Autocomplete
                        onLoad={(auto) => setAutocomplete(auto)}
                        onPlaceChanged={handlePlaceSelected}
                      >
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder="Rechercher une adresse"
                          aria-label="Rechercher une adresse"
                        />
                      </Autocomplete>
                      <div className="form-group mb-3">
                        <label htmlFor="mapZoom">Niveau de zoom (1-20)</label>
                        <input
                          id="mapZoom"
                          type="number"
                          className="form-control"
                          min="1"
                          max="20"
                          value={mapZoom}
                          onChange={handleZoomChange}
                          aria-label="Niveau de zoom de la carte"
                        />
                      </div>
                      {map}
                    </LoadScript>
                  </div>
                  <button
                    type="button"
                    className="button rwmb-map-goto-address-button btn btn-primary m-t20"
                    onClick={handleGeocodeAddress}
                  >
                    Trouver l'adresse sur la carte
                  </button>
                  <p>
                    Remarque : Cliquez ou déplacez le marqueur sur la carte pour définir l'adresse,
                    utilisez la barre de recherche pour trouver une adresse, ou entrez l'adresse et
                    cliquez sur "Trouver l'adresse" pour mettre à jour la carte.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="address">Adresse</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="address"
                      className="form-control sf-form-control"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-globe"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="apartment">Appartement/Suite #</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="apartment"
                      className="form-control sf-form-control"
                      name="apartment"
                      type="text"
                      value={formData.apartment}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-map-marker"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="city">Ville</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="city"
                      className="form-control sf-form-control"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-map-marker"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="state">État</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="state"
                      className="form-control sf-form-control"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-map-marker"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="postalCode">Code postal</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="postalCode"
                      className="form-control sf-form-control"
                      name="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-map-marker"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="country">Pays</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="country"
                      className="form-control sf-form-control"
                      name="country"
                      type="text"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-map-marker"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="latitude">Latitude</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="latitude"
                      className="form-control sf-form-control"
                      name="latitude"
                      type="text"
                      value={formData.latitude}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-street-view"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="longitude">Longitude</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="longitude"
                      className="form-control sf-form-control"
                      name="longitude"
                      type="text"
                      value={formData.longitude}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-street-view"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="card aon-card" id="aon-socialMedia-panel">
          <div className="card-header aon-card-header">
            <h4>
              <i className="fa fa-share-alt"></i> Médias sociaux
            </h4>
          </div>
          <div className="card-body aon-card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="facebook">Facebook</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="facebook"
                      className="form-control sf-form-control"
                      name="facebook"
                      type="url"
                      value={formData.facebook}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-facebook"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="twitter">Twitter</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="twitter"
                      className="form-control sf-form-control"
                      name="twitter"
                      type="url"
                      value={formData.twitter}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-twitter"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="linkedin">LinkedIn</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="linkedin"
                      className="form-control sf-form-control"
                      name="linkedin"
                      type="url"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-linkedin"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="pinterest">Pinterest</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="pinterest"
                      className="form-control sf-form-control"
                      name="pinterest"
                      type="url"
                      value={formData.pinterest}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-pinterest"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="digg">Digg</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="digg"
                      className="form-control sf-form-control"
                      name="digg"
                      type="url"
                      value={formData.digg}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-digg"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="instagram">Instagram</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="instagram"
                      className="form-control sf-form-control"
                      name="instagram"
                      type="url"
                      value={formData.instagram}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-instagram"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="card aon-card" id="aon-passUpdate-panel">
          <div className="card-header aon-card-header">
            <h4>
              <i className="fa fa-lock"></i> Mise à jour du mot de passe
            </h4>
          </div>
          <div className="card-body aon-card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="newPassword">Nouveau mot de passe</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="newPassword"
                      className="form-control sf-form-control"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-lock"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="confirmPassword">Répéter le mot de passe</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="confirmPassword"
                      className="form-control sf-form-control"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <i className="aon-input-icon fa fa-lock"></i>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Entrez le même mot de passe dans les deux champs. Utilisez une lettre majuscule et un
              chiffre pour un mot de passe plus fort.
            </p>
          </div>
        </div>

        {/* Category Section */}
        <div className="card aon-card" id="aon-category-panel">
          <div className="card-header aon-card-header">
            <h4>
              <i className="fa fa-list-alt"></i> Catégorie
            </h4>
          </div>
          <div className="card-body aon-card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Catégorie</label>
                  <div className="alert alert-info">
                    Actuellement, vous pouvez choisir 10 catégories. Vous pouvez augmenter ce nombre
                    en mettant à niveau votre plan d'adhésion.
                  </div>
                  <select
                    className="selectpicker"
                    multiple
                    data-live-search="true"
                    name="categories"
                    value={formData.categories}
                    onChange={(e) => handleSelectChange('categories', e.target.selectedOptions)}
                  >
                    <option value="laundry">Blanchisserie</option>
                    <option value="taxi">Services de taxi</option>
                    <option value="car_dealer">Concessionnaire automobile</option>
                    <option value="event_organizer">Organisateur d'événements</option>
                  </select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label>Catégorie principale</label>
                  <div className="radio-inline-box">
                    <div className="checkbox sf-radio-checkbox">
                      <input
                        id="mainCategoryLaundry"
                        name="mainCategory"
                        value="laundry"
                        type="radio"
                        checked={formData.mainCategory === 'laundry'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="mainCategoryLaundry">Blanchisserie</label>
                    </div>
                    <div className="checkbox sf-radio-checkbox">
                      <input
                        id="mainCategoryTaxi"
                        name="mainCategory"
                        value="taxi"
                        type="radio"
                        checked={formData.mainCategory === 'taxi'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="mainCategoryTaxi">Services de taxi</label>
                    </div>
                    <div className="checkbox sf-radio-checkbox">
                      <input
                        id="mainCategoryCarDealer"
                        name="mainCategory"
                        value="car_dealer"
                        type="radio"
                        checked={formData.mainCategory === 'car_dealer'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="mainCategoryCarDealer">Concessionnaire automobile</label>
                    </div>
                    <div className="checkbox sf-radio-checkbox">
                      <input
                        id="mainCategoryEventOrganizer"
                        name="mainCategory"
                        value="event_organizer"
                        type="radio"
                        checked={formData.mainCategory === 'event_organizer'}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="mainCategoryEventOrganizer">Organisateur d'événements</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="card aon-card" id="aon-amenities-panel">
          <div className="card-header aon-card-header">
            <h4>
              <i className="fa fa-shield"></i> Équipements
            </h4>
          </div>
          <div className="card-body aon-card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Équipements</label>
                  <select
                    className="selectpicker"
                    multiple
                    data-live-search="true"
                    name="amenities"
                    value={formData.amenities}
                    onChange={(e) => handleSelectChange('amenities', e.target.selectedOptions)}
                  >
                    <option value="laundry">Blanchisserie</option>
                    <option value="taxi">Services de taxi</option>
                    <option value="car_dealer">Concessionnaire automobile</option>
                    <option value="event_organizer">Organisateur d'événements</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="card aon-card" id="aon-gallery-panel">
          <div className="card-header aon-card-header">
            <h4>
              <i className="fa fa-image"></i> Images de la galerie
            </h4>
          </div>
          <div className="card-body aon-card-body">
            <div {...getRootProps()} className="dropzone dropzone-custom">
              <input {...getInputProps()} />
              <p>Glissez-déposez des images ici, ou cliquez pour sélectionner des fichiers</p>
            </div>
            <div className="mt-3">
              {galleryFiles.map((file, index) => (
                <div key={index}>{file.name}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="card aon-card" id="aon-video-panel">
          <div className="card-header aon-card-header">
            <h4>
              <i className="fa fa-video-camera"></i> Téléchargement de vidéo
            </h4>
          </div>
          <div className="card-body aon-card-body">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Insérez l'URL de la vidéo YouTube, Vimeo ou Facebook"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                aria-label="URL de la vidéo"
              />
              <div className="input-group-append">
                <button className="btn admin-button" type="button">
                  Aperçu
                </button>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn admin-button" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </form>
    </React.Fragment>
  );
}

export default Profile;