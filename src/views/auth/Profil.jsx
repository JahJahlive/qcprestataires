// src/Profile.jsx
import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import Select from 'react-select';

function Profile() {
  // State declarations
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
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    latitude: 4.058624677411845, // Default coordinates (Douala, Cameroon)
    longitude: 9.71139907836914,
    facebook: '',
    newPassword: '',
    confirmPassword: '',
    categories: [],
    mainCategory: '',
    amenities: [],
    videoUrl: '',
  });

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [mapZoom, setMapZoom] = useState(13); // Default zoom level
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false); // Track API load

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Define bounds for Douala, Yaoundé, and Bafoussam
  const bounds = {
    south: 3.8, // Southwest of Douala/Yaoundé
    west: 9.7,
    north: 5.5, // Northeast of Bafoussam/Yaoundé
    east: 11.6,
  };

  // Autocomplete options (computed dynamically)
  const autocompleteOptions = useMemo(() => {
    if (!isGoogleMapsLoaded || !window.google || !window.google.maps) {
      return {
        componentRestrictions: { country: 'cm' }, // Fallback without bounds
      };
    }
    return {
      componentRestrictions: { country: 'cm' }, // Restrict to Cameroon
      bounds: new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(bounds.south, bounds.west),
        new window.google.maps.LatLng(bounds.north, bounds.east)
      ),
      strictBounds: true, // Enforce results within bounds
    };
  }, [isGoogleMapsLoaded, bounds]);

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

  // Handle select multiple (categories, amenities) with react-select
  const handleSelectChange = (name, selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map((option) => option.value) : [];
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
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
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
          )}&key=${GOOGLE_MAPS_API_KEY}&components=country:CM`
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
        zoom={mapZoom}
        onClick={handleMarkerDragEnd}
      >
        <Marker position={center} draggable={true} onDragEnd={handleMarkerDragEnd} />
      </GoogleMap>
    ),
    [center, mapZoom, handleMarkerDragEnd]
  );

  // Options for categories and amenities
  const categoryOptions = [
    { value: 'laundry', label: 'Blanchisserie' },
    { value: 'taxi', label: 'Services de taxi' },
    { value: 'car_dealer', label: 'Concessionnaire automobile' },
    { value: 'event_organizer', label: 'Organisateur d\'événements' },
  ];

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="alert alert-danger">
        Erreur : La clé API Google Maps n'est pas configurée. Veuillez ajouter
        VITE_GOOGLE_MAPS_API_KEY dans le fichier .env et redémarrer le serveur.
      </div>
    );
  }

  return (
    <>
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
                  <div className="address-area-map">
                    <LoadScript
                      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                      libraries={['places']}
                      onLoad={() => setIsGoogleMapsLoaded(true)} // Set flag when API loads
                    >
                      <Autocomplete
                        onLoad={(auto) => setAutocomplete(auto)}
                        onPlaceChanged={handlePlaceSelected}
                        options={autocompleteOptions}
                      >
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder="Rechercher une adresse à Douala, Yaoundé ou Bafoussam"
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
                    Remarque : Recherchez des adresses uniquement à Douala, Yaoundé ou Bafoussam.
                    Déplacez le marqueur ou entrez l'adresse et cliquez sur "Trouver l'adresse".
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
                  <Select
                    isMulti
                    name="categories"
                    options={categoryOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={categoryOptions.filter((option) =>
                      formData.categories.includes(option.value)
                    )}
                    onChange={(selected) => handleSelectChange('categories', selected)}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label>Catégorie principale</label>
                  <div className="radio-inline-box">
                    {categoryOptions.map((option) => (
                      <div key={option.value} className="checkbox sf-radio-checkbox">
                        <input
                          id={`mainCategory${option.value}`}
                          name="mainCategory"
                          value={option.value}
                          type="radio"
                          checked={formData.mainCategory === option.value}
                          onChange={handleInputChange}
                        />
                        <label htmlFor={`mainCategory${option.value}`}>{option.label}</label>
                      </div>
                    ))}
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
                  <Select
                    isMulti
                    name="amenities"
                    options={categoryOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={categoryOptions.filter((option) =>
                      formData.amenities.includes(option.value)
                    )}
                    onChange={(selected) => handleSelectChange('amenities', selected)}
                  />
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
    </>
  );
}

export default Profile;