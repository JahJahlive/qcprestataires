// src/views/auth/Profil.jsx
import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Select from 'react-select';
import axiosClient from '../../axios-client';

function Profile() {
  // State declarations
  const [formData, setFormData] = useState({
    name: '',
    biography: '',
    mobile: '',
    alternateMobile: '',
    email:'',
    address: '',
    city: '',
    latitude: 4.051056, // Default: Douala, Cameroon
    longitude: 9.767868,
    newPassword: '',
    confirmPassword: '',
    categories: [],
    mainCategory: '',
    amenities: [],
    videoUrl: '',
  });

  useEffect(() => {
    axiosClient
      .get('/user')
      .then(({ data }) => {
        setFormData({
          ...formData,
          name: data.name || '',
          email: data.email || '',
          biography: data.biographie || '',
          mobile: data.phone || '',
          alternateMobile: data.phone2 || '',
          photo_avatar: data.photo_avatar || 'images/pic-large.jpg',
          photo_couverture: data.photo_couverture || 'images/banner/job-banner.jpg',
          latitude: data.latitude || 4.051056, // Default: Douala, Cameroon
          longitude: data.longitude || 9.767868
        })
        console.log('Current user data:', data);
      })
      .catch((error) => {
      });
  }, []);

  const [avatar, setAvatar] = useState(null); // Default avatar from user data
  const [coverImage, setCoverImage] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [frontDocument, setFrontDocument] = useState(null); // Front ID document
  const [backDocument, setBackDocument] = useState(null); // Back ID document
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const autocompleteRef = useRef(null);

  // Bounds for Douala, Yaoundé, Bafoussam
  const bounds = {
    south: 3.8,
    west: 9.7,
    north: 5.5,
    east: 11.6,
  };

  // Handle file upload for front side
  const onDropFront = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFrontDocument(file);
    }
  }, []);

  // Handle file upload for back side
  const onDropBack = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setBackDocument(file);
    }
  }, []);

  // Configure Dropzone for front side
  const {
    getRootProps: getFrontRootProps,
    getInputProps: getFrontInputProps,
    isDragActive: isFrontDragActive,
  } = useDropzone({
    onDrop: onDropFront,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  // Configure Dropzone for back side
  const {
    getRootProps: getBackRootProps,
    getInputProps: getBackInputProps,
    isDragActive: isBackDragActive,
  } = useDropzone({
    onDrop: onDropBack,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  // Handle PlaceAutocompleteElement selection
  const handlePlaceSelected = useCallback(
    async (event) => {
      if (!GOOGLE_MAPS_API_KEY) {
        setError('Clé API Google Maps manquante.');
        return;
      }
      const place = event.detail;
      if (place?.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const addressComponents = place.address_components || [];

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
          address: address.trim() || place.formatted_address || '',
          city,
          state,
          postalCode,
          country,
          latitude: lat,
          longitude: lng,
        }));
      } else {
        setError('Adresse invalide sélectionnée.');
      }
    },
    [GOOGLE_MAPS_API_KEY]
  );

  // Configure PlaceAutocompleteElement
  useEffect(() => {
    if (isGoogleMapsLoaded && autocompleteRef.current) {
      autocompleteRef.current.componentRestrictions = { country: 'cm' };
      if (window.google?.maps) {
        autocompleteRef.current.bounds = new window.google.maps.LatLngBounds(
          new window.google.maps.LatLng(bounds.south, bounds.west),
          new window.google.maps.LatLng(bounds.north, bounds.east)
        );
        autocompleteRef.current.strictBounds = true;
      }
      autocompleteRef.current.addEventListener('gmp-placeselect', handlePlaceSelected);
      return () => {
        autocompleteRef.current?.removeEventListener('gmp-placeselect', handlePlaceSelected);
      };
    }
  }, [isGoogleMapsLoaded, handlePlaceSelected]);

  // Handle input changes
  const handleInputChange = (e) => {
    console.log('Input changed:', e.target.name, e.target.value);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle react-select changes
  const handleSelectChange = (name, selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  // Handle file inputs
  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  // Handle gallery files
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

  // Handle marker drag or map click
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
          setError('Impossible de récupérer l\'adresse.');
        }
      } catch (err) {
        setError('Erreur lors de la géolocalisation.');
      }
    },
    [GOOGLE_MAPS_API_KEY]
  );

  // Handle geocode address button
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
          setError('Adresse introuvable.');
        }
      } catch (err) {
        setError('Erreur lors de la géolocalisation.');
      }
    },
    [formData, GOOGLE_MAPS_API_KEY]
  );

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
    data.append('_method', 'PUT');
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
    if (frontDocument) data.append('recto', frontDocument);
    if (backDocument) data.append('verso', backDocument);

    await axiosClient.post('/users/update', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(() => {
      setSuccess('Profil mis à jour avec succès !')
      setFormData((prev) => ({
        ...prev,
        newPassword: '',
        confirmPassword: '',
      }));

      setGalleryFiles([]);
      setFrontDocument(null);
      setBackDocument(null);

      })
    .catch((err) => {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour du profil.')

      }
    )
    .finally(() => {
      setLoading(false);
    });
  };

  // Map styles
  const mapContainerStyle = {
    height: '460px',
    width: '100%',
  };

  // Map center
  const center = {
    lat: parseFloat(formData.latitude) || 4.051056,
    lng: parseFloat(formData.longitude) || 9.767868,
  };

  // Memoized map
  const map = useMemo(
    () => (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        onClick={handleMarkerDragEnd}
      >
        <Marker position={center} draggable={true} onDragEnd={handleMarkerDragEnd} />
      </GoogleMap>
    ),
    [center, handleMarkerDragEnd]
  );

  // Category options
  const categoryOptions = [
    { value: 'laundry', label: 'Blanchisserie' },
    { value: 'taxi', label: 'Services de taxi' },
    { value: 'car_dealer', label: 'Concessionnaire automobile' },
    { value: 'event_organizer', label: 'Organisateur d\'événements' },
  ];

  // Helper to render file preview
  const renderFilePreview = (file) => {
    if (!file) return null;
    const isImage = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
    return (
      <div className="file-preview">
        {isImage ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            onLoad={(e) => URL.revokeObjectURL(e.target.src)} // Clean up
          />
        ) : (
          <div className="pdf-placeholder">
            <i className="fa fa-file-pdf-o"></i>
            <span>{file.name}</span>
          </div>
        )}
      </div>
    );
  };

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="alert alert-danger">
        Erreur : Clé API Google Maps manquante dans .env.
      </div>
    );
  }

  return (
    <div>
      <div className="aon-provi-tabs d-flex flex-wrap justify-content-between">
        <div className="aon-provi-left">
          <ul className="aon-provi-links">
            <li><a href="#aon-about-panel">À propos</a></li>
            <li><a href="#aon-passUpdate-panel">Mot de passe</a></li>
            <li><a href="#aon-adress-panel">Adresse</a></li>
            <li><a href="#aon-identity-panel">Identité</a></li>
            <li><a href="#aon-category-panel">Catégorie</a></li>
            <li><a href="#aon-amenities-panel">Équipements</a></li>
            <li><a href="#aon-gallery-panel">Galerie</a></li>
            <li><a href="#aon-video-panel">Vidéo</a></li>
          </ul>
        </div>
      </div>

      <div className="aon-admin-heading">
        <h4>Modifier le profil</h4>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* About Section */}
        <div className="card aon-card" id="aon-about-panel">
          <div className="card-header aon-card-header d-flex justify-content-between">
            <h4><i className="fa fa-user"></i> À propos</h4>
             <button type="submit" className="btn admin-button" disabled={loading}>
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
          </div>
         
          <div className="card-body aon-card-body">
            <div className="row">
              <div className="col-xl-6">
                <div className="aon-staff-avtar">
                  <div className="aon-staff-avtar-header">
                    <div className="aon-pro-avtar-pic">
                      <img
                        src={avatar ? URL.createObjectURL(avatar) : formData.photo_avatar || 'images/pic-large.jpg'}
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
                          src={coverImage ? URL.createObjectURL(coverImage) : formData.photo_couverture || 'images/banner/job-banner.jpg'}
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
                    <h4>Téléchargez votre avatar</h4>
                    <ul>
                      <li>Largeur/hauteur min : <span>600 x 600 px</span></li>
                      <li>Taille max : <span>5 Mo</span></li>
                      <li>Extensions : <span>JPEG, PNG, GIF</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Nom</label>
                      <div className="aon-inputicon-box">
                        <input
                          id="name"
                          className="form-control sf-form-control"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                        <i className="aon-input-icon fa fa-user"></i>
                      </div>
                    </div>
                  </div>
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
                    <label htmlFor="email">E-mail</label>
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
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="biography">Biographie</label>
                      <textarea
                        id="biography"
                        className="form-control"
                        name="biography"
                        rows="4"
                        value={formData.biography}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Password Section */}
        <div className="card aon-card" id="aon-passUpdate-panel">
          <div className="card-header aon-card-header">
            <h4><i className="fa fa-lock"></i> Mot de passe</h4>
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
                  <label htmlFor="confirmPassword">Confirmer</label>
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
            <p>Utilisez une majuscule et un chiffre pour le mot de passe.</p>
          </div>
        </div>

        {/* Address Section */}
        <div className="card aon-card" id="aon-adress-panel">
          <div className="card-header aon-card-header">
            <h4><i className="fa fa-address-card"></i> Adresse</h4>
          </div>
          <div className="card-body aon-card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label className='text-danger'>Mettez le marker sur votre adresse</label>
                  <div className="address-area-map">
                    <LoadScript
                      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                      libraries={['places']}
                      onLoad={() => setIsGoogleMapsLoaded(true)}
                    >
                     
                      {map}
                    </LoadScript>
                  </div>
                  <p></p>
                </div>
              </div>
              {/* <div className="col-md-6">
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
           */}
              {/* <div className="col-md-6">
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
              </div> */}
            </div>
          </div>
        </div>

        {/* Identity Document Section */}
        <div className="card aon-card" id="aon-identity-panel">
          <div className="card-header aon-card-header">
            <h4><i className="fa fa-id-card"></i> Télécharger une preuve d'identité</h4>
          </div>
          <div className="card-body aon-card-body">
            <div className="alert alert-warning m-b30">
              Le processus de vérification des documents est en cours.
            </div>

            <div className="row justify-content-between m-b10">
              {renderFilePreview(frontDocument)}
            {renderFilePreview(backDocument)}

            </div>

          <div className='row justify-content-between'>

            {/* Front Side Upload */}
            <div
              {...getFrontRootProps()}
              className={`dropzone col-5 dropzone-custom  ${isFrontDragActive ? 'dz-drag-active' : ''}`}
            >
              <input {...getFrontInputProps()} />
              <div className="dz-message">
                <span className="note">Télécharger le recto du document</span>
              </div>
            </div>

            {/* Back Side Upload */}
            <div
              {...getBackRootProps()}
              className={`dropzone col-5 dropzone-custom ${isBackDragActive ? 'dz-drag-active' : ''}`}
            >
              <input {...getBackInputProps()} />
              <div className="dz-message">
                <span className="note">Télécharger le verso du document</span>
              </div>
            </div>
</div>
          
           
          </div>
        </div>


        {/* Category Section */}
        <div className="card aon-card" id="aon-category-panel">
          <div className="card-header aon-card-header">
            <h4><i className="fa fa-list-alt"></i> Catégorie</h4>
          </div>
          <div className="card-body aon-card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label>Catégories</label>
                  <div className="alert alert-info">
                    Maximum 10 catégories. Mettez à niveau votre plan pour plus.
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
            <h4><i className="fa fa-shield"></i> Équipements</h4>
          </div>
          <div className="card-body aon-card-body">
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

       {/* Gallery Section */}
        <div className="card aon-card" id="aon-gallery-panel">
          <div className="card-header aon-card-header">
            <h4><i className="fa fa-image"></i> Galerie</h4>
          </div>
          <div className="card-body aon-card-body">
            <div {...getRootProps()} className="dropzone dropzone-custom">
              <input {...getInputProps()} />
              <p>Glissez-déposez des images ou cliquez pour sélectionner.</p>
            </div>
            <div className="gallery-previews mt-3">
              {galleryFiles.map((file, index) => (
                <div key={index} className="file-preview">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    onLoad={(e) => URL.revokeObjectURL(e.target.src)} // Clean up
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="card aon-card" id="aon-video-panel">
          <div className="card-header aon-card-header">
            <h4><i className="fa fa-video-camera"></i> Vidéo</h4>
          </div>
          <div className="card-body aon-card-body">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="URL YouTube, Vimeo ou Facebook"
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
      </form>
    </div>
  );
}

export default Profile;