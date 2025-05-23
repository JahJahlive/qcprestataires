import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function CarteIdentite() {
    // Handle file upload for front side
    const onDropFront = useCallback((acceptedFiles) => {
      // Process uploaded files (e.g., send to API)
      console.log('Front side files:', acceptedFiles);
      // Example API call
      const formData = new FormData();
      acceptedFiles.forEach((file) => formData.append('frontDocument', file));
      fetch('/api/upload/front', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log('Upload success:', data))
        .catch((error) => console.error('Upload error:', error));
    }, []);
  
    // Handle file upload for back side
    const onDropBack = useCallback((acceptedFiles) => {
      console.log('Back side files:', acceptedFiles);
      const formData = new FormData();
      acceptedFiles.forEach((file) => formData.append('backDocument', file));
      fetch('/api/upload/back', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log('Upload success:', data))
        .catch((error) => console.error('Upload error:', error));
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

  return (
    <div className="card aon-card">
    <div className="card-header aon-card-header">
      <h4>
        <i className="fa fa-user"></i> Télécharger une preuve d'identité
      </h4>
    </div>

    <div className="card-body aon-card-body">
      <div className="alert alert-warning m-b30">
        Le processus de vérification des documents est en cours.
      </div>

      {/* Front Side Upload */}
      <div
        {...getFrontRootProps()}
        className={`dropzone dropzone-custom m-b30 ${isFrontDragActive ? 'dz-drag-active' : ''}`}
      >
        <input {...getFrontInputProps()} />
        <div className="dz-message">
          <span className="note">
            Télécharger le recto du document
          </span>
        </div>
      </div>

      {/* Back Side Upload */}
      <div
        {...getBackRootProps()}
        className={`dropzone dropzone-custom ${isBackDragActive ? 'dz-drag-active' : ''}`}
      >
        <input {...getBackInputProps()} />
        <div className="dz-message">
          <span className="note">
            Télécharger le verso du document
          </span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CarteIdentite