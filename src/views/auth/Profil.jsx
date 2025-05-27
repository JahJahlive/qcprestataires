import React, { useCallback, useState, useMemo, useEffect } from 'react';
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
    email: '',
    address: '',
    city: '',
    latitude: 4.051056, // Default: Douala, Cameroon
    longitude: 9.767868,
    newPassword: '',
    newPassword_confirmation: '',
    cni_recto: null,
    cni_verso: null,
    categories: [],
    mainCategory: '',
    amenities: [],
    videoUrl: '',
    photo_avatar: 'images/pic-large.jpg',
    photo_couverture: 'images/banner/job-banner.jpg',
    gallery: [],
  });

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [frontDocument, setFrontDocument] = useState(null);
  const [backDocument, setBackDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Bounds for Douala, Yaoundé, Bafoussam
  const bounds = {
    south: 3.8,
    west: 9.7,
    north: 5.5,
    east: 11.6,
  };

  // Fetch user data on mount
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
          latitude: data.latitude || 4.051056,
          longitude: data.longitude || 9.767868,
          cni_recto: data.cni_recto || null,
          cni_verso: data.cni_verso || null,
          gallery: data.gallery || [],
        });
        console.log('Current user data:', data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setError('Erreur lors du chargement des données utilisateur.');
      });
  }, []);

  // Handle file upload for front side
  const onDropFront = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFrontDocument(acceptedFiles[0]);
      setFormData((prev) => ({ ...prev, cni_recto: null }));
    }
  }, []);

  // Handle file upload for back side
  const onDropBack = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setBackDocument(acceptedFiles[0]);
      setFormData((prev) => ({ ...prev, cni_verso: null }));
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
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDropRejected: () => setError('Fichier invalide. Utilisez JPEG, PNG ou PDF, max 5 Mo.'),
  });

  // Configure Dropzone for back side
  const {
    getRootProps: getBackRootProps,
    getInputProps: getBackInputProps,
    isDragActive: isBackDragActive,
  } = useDropzone({
    onDrop: onDropBack,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDropRejected: () => setError('Fichier invalide. Utilisez JPEG, PNG ou PDF, max 5 Mo.'),
  });

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
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setError('Fichiers invalides. Utilisez JPEG, PNG ou GIF, max 5 Mo.');
        return;
      }
      setGalleryFiles((prev) => [...prev, ...acceptedFiles]);
      setFormData((prev) => ({ ...prev, gallery: [] })); // Clear existing gallery URLs
    },
    onDropRejected: () => setError('Fichiers invalides. Utilisez JPEG, PNG ou GIF, max 5 Mo.'),
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
        } else if (data.status === 'OVER_QUERY_LIMIT') {
          setError('Limite de requêtes Google Maps dépassée. Réessayez plus tard.');
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
        } else if (data.status === 'OVER_QUERY_LIMIT') {
          setError('Limite de requêtes Google Maps dépassée. Réessayez plus tard.');
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

    if (formData.newPassword) {
      if (formData.newPassword !== formData.newPassword_confirmation) {
        console.error('Passwords do not match', formData.newPassword, formData.newPassword_confirmation);
        setError('Les mots de passe ne correspondent pas.');
        setLoading(false);
        return;
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
      if (!passwordRegex.test(formData.newPassword)) {
        setError('Le mot de passe doit contenir une majuscule et un chiffre.');
        setLoading(false);
        return;
      }
    }

    const data = new FormData();
    data.append('_method', 'PUT');

    // Append formData fields, excluding gallery, cni_recto, and cni_verso
    Object.keys(formData).forEach((key) => {
      if (key !== 'gallery' && key !== 'cni_recto' && key !== 'cni_verso') {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item, index) => {
            data.append(`${key}[${index}]`, item);
          });
        } else {
          data.append(key, formData[key] || '');
        }
      }
    });

    // Append files
    if (avatar) data.append('photo_avatar', avatar);
    if (coverImage) data.append('photo_couverture', coverImage);

    // Handle cni_recto
    if (frontDocument) {
      data.append('cni_recto', frontDocument);
    } else if (!formData.cni_recto && !frontDocument) {
      data.append('cni_recto', ''); // Send empty string to indicate null
    }

    // Handle cni_verso
    if (backDocument) {
      data.append('cni_verso', backDocument);
    } else if (!formData.cni_verso && !backDocument) {
      data.append('cni_verso', ''); // Send empty string to indicate null
    }

    // Handle gallery
    if (galleryFiles.length > 0) {
      // Append new gallery files
      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];
        if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
          data.append(`gallery[${i}]`, file);
        } else {
          setError(`Le fichier ${file.name} n'est pas une image valide (JPEG, PNG, GIF).`);
          setLoading(false);
          return;
        }
      }
    } else if (formData.gallery.length === 0) {
      // Send empty array for gallery if all images are deleted
      data.append('gallery', JSON.stringify([]));
    }

    // Debug FormData contents
    for (let [key, value] of data.entries()) {
      console.log(`FormData: ${key} =`, value);
    }

    try {
      await axiosClient.post('/users/update', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Profil mis à jour avec succès !');
      setFormData((prev) => ({
        ...prev,
        newPassword: '',
        newPassword_confirmation: '',
        gallery: [],
        cni_recto: null,
        cni_verso: null,
      }));
      setGalleryFiles([]);
      setFrontDocument(null);
      setBackDocument(null);
      // Refetch user data to update previews
      const { data: updatedData } = await axiosClient.get('/user');
      setFormData((prev) => ({
        ...prev,
        cni_recto: updatedData.cni_recto || null,
        cni_verso: updatedData.cni_verso || null,
        gallery: updatedData.gallery || [],
        photo_avatar: updatedData.photo_avatar || prev.photo_avatar,
        photo_couverture: updatedData.photo_couverture || prev.photo_couverture,
      }));
    } catch (err) {
      const errorMsg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).join(', ')
        : err.response?.data?.message || 'Erreur lors de la mise à jour du profil.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
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
  const renderFilePreview = (fileOrUrl, alt = '', onDelete) => {
    if (!fileOrUrl) return null;

    // Check if input is a File object (from react-dropzone) or a URL (from formData)
    const isFile = fileOrUrl instanceof File;
    const isImage = isFile
      ? ['image/jpeg', 'image/png', 'image/gif'].includes(fileOrUrl.type)
      : fileOrUrl.endsWith('.jpg') || fileOrUrl.endsWith('.jpeg') || fileOrUrl.endsWith('.png') || fileOrUrl.endsWith('.gif');

    if (!isImage) {
      return (
        <div className="file-preview">
          <div className="file-preview-content">
            <i className="fa fa-file-pdf"></i> Fichier PDF : {isFile ? fileOrUrl.name : 'Document'}
            <button
              type="button"
              className="btn btn-danger btn-sm delete-button"
              onClick={onDelete}
              aria-label={`Supprimer ${alt}`}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
      );
    }

    const src = isFile ? URL.createObjectURL(fileOrUrl) : fileOrUrl;

    return (
      <div className="file-preview">
        <div className="file-preview-content">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => isFile && URL.revokeObjectURL(src)}
            onError={() => isFile && URL.revokeObjectURL(src)}
          />
          <button
            type="button"
            className="btn btn-danger btn-sm delete-button"
            onClick={onDelete}
            aria-label={`Supprimer ${alt}`}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
    );
  };

  // Delete handlers
  const handleDeleteFront = () => {
    setFrontDocument(null);
    setFormData((prev) => ({ ...prev, cni_recto: null }));
  };

  const handleDeleteBack = () => {
    setBackDocument(null);
    setFormData((prev) => ({ ...prev, cni_verso: null }));
  };

  const handleDeleteGalleryFile = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteGalleryUrl = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
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
                        src={avatar ? URL.createObjectURL(avatar) : formData.photo_avatar}
                        alt="Avatar"
                        loading="lazy"
                        onLoad={() => avatar && URL.revokeObjectURL(URL.createObjectURL(avatar))}
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
                          src={coverImage ? URL.createObjectURL(coverImage) : formData.photo_couverture}
                          alt="Cover"
                          loading="lazy"
                          onLoad={() => coverImage && URL.revokeObjectURL(URL.createObjectURL(coverImage))}
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
                          aria-label="Nom"
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
                          aria-label="Mobile"
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
                          aria-label="Mobile alternatif"
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
                          aria-label="E-mail"
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
                        aria-label="Biographie"
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
                      aria-label="Nouveau mot de passe"
                    />
                    <i className="aon-input-icon fa fa-lock"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="newPassword_confirmation">Confirmer</label>
                  <div className="aon-inputicon-box">
                    <input
                      id="newPassword_confirmation"
                      className="form-control sf-form-control"
                      name="newPassword_confirmation"
                      type="password"
                      value={formData.newPassword_confirmation}
                      onChange={handleInputChange}
                      aria-label="Confirmer le mot de passe"
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
                      aria-label="Adresse"
                    />
                    <i className="aon-input-icon fa fa-globe"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
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
                      aria-label="Ville"
                    />
                    <i className="aon-input-icon fa fa-map-marker"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-3"> <button
              type="button"
              className="btn admin-button mt-5"
              onClick={handleGeocodeAddress}
              aria-label="Géocoder l'adresse"
            >
              Trouver
            </button></div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="text-danger">Rafraichir la page si la carte ne se charge pas.</label>
                  <div className="address-area-map">
                    <LoadScript
                      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                      libraries={['places']}
                      onLoad={() => setIsGoogleMapsLoaded(true)}
                      onError={() => setError('Erreur de chargement de Google Maps. Vérifiez la clé API.')}
                    >
                      {map}
                    </LoadScript>
                  </div>
                </div>
              </div>
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
              {/* Front Side Preview */}
              <div>
                 {frontDocument ? (
                renderFilePreview(frontDocument, 'Recto du document', handleDeleteFront)
              ) : (
                formData.cni_recto &&
                renderFilePreview(formData.cni_recto, 'Recto du document', handleDeleteFront)
              )}

              </div>
             <div>
               {/* Back Side Preview */}
              {backDocument ? (
                renderFilePreview(backDocument, 'Verso du document', handleDeleteBack)
              ) : (
                formData.cni_verso &&
                renderFilePreview(formData.cni_verso, 'Verso du document', handleDeleteBack)
              )}
             </div>
             
            </div>

            <div className="row justify-content-between">
              {/* Front Side Upload */}
              <div
                {...getFrontRootProps()}
                className={`dropzone col-5 dropzone-custom ${isFrontDragActive ? 'dz-drag-active' : ''}`}
              >
                <input {...getFrontInputProps()} aria-label="Télécharger le recto du document d'identité" />
                <div className="dz-message">
                  <span className="note">Télécharger le recto du document</span>
                </div>
              </div>

              {/* Back Side Upload */}
              <div
                {...getBackRootProps()}
                className={`dropzone col-5 dropzone-custom ${isBackDragActive ? 'dz-drag-active' : ''}`}
              >
                <input {...getBackInputProps()} aria-label="Télécharger le verso du document d'identité" />
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
                    value={categoryOptions.filter((option) => formData.categories.includes(option.value))}
                    onChange={(selected) => handleSelectChange('categories', selected)}
                    aria-label="Sélectionner des catégories"
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
                          aria-label={`Sélectionner ${option.label} comme catégorie principale`}
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
                value={categoryOptions.filter((option) => formData.amenities.includes(option.value))}
                onChange={(selected) => handleSelectChange('amenities', selected)}
                aria-label="Sélectionner des équipements"
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
            <div className="gallery-previews mb-3">
              {/* Existing gallery images */}
              {formData.gallery &&
                formData.gallery.map(({ url }, index) => (
                  <div key={`existing-${index}`} className="file-preview">
                    {renderFilePreview(url, `Image de galerie ${index + 1}`, () =>
                      handleDeleteGalleryUrl(index)
                    )}
                  </div>
                ))}
              {/* New uploaded files */}
              {galleryFiles.map((file, index) => (
                <div key={`new-${index}`} className="file-preview">
                  {renderFilePreview(file, `Nouvelle image ${index + 1}`, () =>
                    handleDeleteGalleryFile(index)
                  )}
                </div>
              ))}
            </div>
            <div {...getRootProps()} className="dropzone dropzone-custom">
              <input {...getInputProps()} aria-label="Télécharger des images pour la galerie" />
              <p>Glissez-déposez des images ou cliquez pour sélectionner (JPEG, PNG, GIF).</p>
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
                <button className="btn admin-button" type="button" aria-label="Aperçu de la vidéo">
                  Aperçu
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Submit Button */}
        <div className="form-footer">
          <button type="submit" className="btn admin-button" disabled={loading}>
            {loading ? 'Enregistrement...' : 'Enregistrer tout'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;