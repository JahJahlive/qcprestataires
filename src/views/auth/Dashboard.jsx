import React from 'react'

export default function Dashboard() {

  return (
    <>
        <div className="aon-provi-tabs d-flex flex-wrap justify-content-between">
                      <div className="aon-provi-left">
                          <ul className="aon-provi-links">
                              <li><a href="#aon-about-panel">À propos</a></li>
                              <li><a href="#aon-contact-panel">Contact</a></li>
                              <li><a href="#aon-adress-panel">Adresse</a></li>
                              <li><a href="#aon-serviceArea-panel">Zone de service</a></li>
                              <li><a href="#aon-servicePer-panel">Service effectué à</a></li>
                              <li><a href="#aon-socialMedia-panel">Médias sociaux</a></li>
                              <li><a href="#aon-passUpdate-panel">Mot de passe</a></li>
                              <li><a href="#aon-category-panel">Catégorie</a></li>
                              <li><a href="#aon-amenities-panel">Équipements</a></li>
                              <li><a href="#aon-languages-panel">Langues</a></li>
                              <li><a href="#aon-gallery-panel">Galerie</a></li>
                              <li><a href="#aon-video-panel">Vidéo</a></li>
                          </ul>
                      </div>
                      <div className="aon-provi-right">
                      </div>	
                  </div> 
              
                  <div className="aon-admin-heading">
                    <h4>Modifier le profil</h4>
                  </div>                
                  
                  <div className="card aon-card">
                    <div className="card-header aon-card-header"><h4><i className="fa fa-user"></i> À propos de moi</h4></div>
                      <div className="card-body aon-card-body">
                        <div className="row">
                              <div className="col-xl-6">
                                  <div className="aon-staff-avtar">
                                    <div className="aon-staff-avtar-header">
                                        <div className="aon-pro-avtar-pic ">
                                              <img src="images/pic-large.jpg" alt=""/>
                                              <button className="admin-button has-toltip">
                                                  <i className="fa fa-camera"></i>
                                                  <span className="header-toltip">Télécharger un avatar</span>
                                                  <input type="file" name="avtar"/>
                                              </button>
                                          </div>
                                          <div className="aon-pro-cover-wrap">
                                              <div className="aon-pro-cover-pic">
                                                  <img src="images/banner/job-banner.jpg" alt=""/>
                                              </div>
                                              <div className="admin-button-upload">
                                                  <span>Télécharger une image de couverture</span>
                                                  <input type="file" name="avtar"/>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="aon-staff-avtar-footer">
                                        <h4 className="aon-staff-avtar-title">Téléchargez votre avatar</h4>
                                          <ul>
                                            <li>Largeur et hauteur minimum : <span>600 x 600 px</span></li>
                                              <li>Taille maximale de téléchargement : <span>512 Mo</span></li>
                                              <li>Extensions : <span>JPEG, PNG, GIF</span></li>
                                          </ul>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-xl-6">
                                  <div className="row">
                                      <div className="col-md-6">
                                          <div className="form-group">
                                              <label>Nom d'utilisateur</label>
                                              <div className="aon-inputicon-box"> 
                                                  <input className="form-control sf-form-control" name="company_name" type="text"/>
                                                  <i className="aon-input-icon fa fa-user"></i>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="form-group">
                                              <label>Nom de l'entreprise</label>
                                              <div className="aon-inputicon-box"> 
                                                  <input className="form-control sf-form-control" name="company_name" type="text"/>
                                                  <i className="aon-input-icon fa fa-building-o"></i>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="form-group">
                                              <label>Prénom</label>
                                              <div className="aon-inputicon-box"> 
                                                  <input className="form-control sf-form-control" name="company_name" type="text"/>
                                                  <i className="aon-input-icon fa fa-user"></i>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="form-group">
                                              <label>Nom de famille</label>
                                              <div className="aon-inputicon-box"> 
                                                  <input className="form-control sf-form-control" name="company_name" type="text"/>
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
                                                          <input id="any111" name="abc" value="five" type="radio"/>
                                                          <label htmlFor="any111">Homme</label>
                                                      </div>
                                                      <div className="checkbox sf-radio-checkbox sf-radio-check-2 sf-raChe-6">
                                                          <input id="body111" name="abc" value="five" type="radio"/>
                                                          <label htmlFor="body111">Femme</label>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6 breck-w1400">
                                          <div className="form-group">
                                              <label>Slogan</label>
                                              <div className="aon-inputicon-box"> 
                                                  <input className="form-control sf-form-control" name="company_name" type="text"/>
                                                  <i className="aon-input-icon fa fa-tags"></i>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-12">
                                          <div className="form-group">
                                              <label>Biographie</label>
                                              <div className="editer-wrap">
                                                  <div className="editer-textarea">
                                                      <textarea className="form-control" rows="4"></textarea>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>   

                  <div className="card aon-card" id="aon-contact-panel">
                    <div className="card-header aon-card-header"><h4><i className="fa fa-envelope"></i> Détails de contact</h4></div>
                      <div className="card-body aon-card-body">
                        <div className="row">
                            <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Mobile</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-phone"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Mobile alternatif</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-mobile"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Adresse e-mail</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-envelope"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Skype</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-skype"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Site web</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-globe"></i>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>  
            
                  <div className="card aon-card" id="aon-adress-panel">
                    <div className="card-header aon-card-header"><h4><i className="fa fa-address-card"></i> Adresse</h4></div>
                      <div className="card-body aon-card-body">
                        <div className="row">
                            <div className="col-md-12">
                                  <div className="form-group">
                                      <label>Emplacement</label>
                                      <div className="grayscle-area address-area-map">
                                          <iframe height="460" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.8534521658976!2d-118.2533646842856!3d34.073270780600225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c6fd9829c6f3%3A0x6ecd11bcf4b0c23a!2s1363%20Sunset%20Blvd%2C%20Los%20Angeles%2C%20CA%2090026%2C%20USA!5e0!3m2!1sen!2sin!4v1620815366832!5m2!1sen!2sin"></iframe>
                                      </div>
                                      
                                      <button className="button rwmb-map-goto-address-button btn btn-primary m-t20" value="address">Trouver l'adresse sur la carte</button>
                                      <p>Remarque : Cela chargera votre adresse sur la carte et remplira la latitude et la longitude</p>
                                  </div>
                              </div>

                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Adresse</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-globe"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Appartement/Suite #</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-map-marker"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Ville</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-map-marker"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>État</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-map-marker"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Code postal</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-map-marker"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Pays</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-map-marker"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Latitude</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-street-view"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Longitude</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-street-view"></i>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div> 

                  <div className="card aon-card" id="aon-serviceArea-panel">
                    <div className="card-header aon-card-header"><h4><i className="fa fa-building-o"></i> Rayon de la zone de service</h4></div>
                      <div className="card-body aon-card-body">
                        <div className="row">
                              <div className="col-md-12">
                                  <div className="form-group">
                                      <div className="sf-range-slider sf-range-w250">
                                          <div className="sf-range-slider-control">Rayon : <span>45 km</span></div>
                                          <input id="ex1" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"/>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div> 

                  <div className="card aon-card" id="aon-servicePer-panel">
                    <div className="card-header aon-card-header"><h4><i className="fa fa-building-o"></i> Service effectué à</h4></div>
                      <div className="card-body aon-card-body">
                        <div className="row">
                              <div className="col-md-12">
                                  <div className="aon-inputicon-box"> 
                                      <div className="radio-inline-box service-perform-list">
                                          <div className="checkbox sf-radio-checkbox sf-radio-check-2">
                                              <input id="loc11" name="abc" value="five" type="radio"/>
                                              <label htmlFor="loc11">Mon emplacement</label>
                                          </div>
                                          <div className="checkbox sf-radio-checkbox sf-radio-check-2">
                                              <input id="loc22" name="abc" value="five" type="radio"/>
                                              <label htmlFor="loc22">Emplacement du client</label>
                                          </div>
                                          <div className="checkbox sf-radio-checkbox sf-radio-check-2">
                                              <input id="loc33" name="abc" value="five" type="radio"/>
                                              <label htmlFor="loc33">Les deux</label>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="card aon-card" id="aon-socialMedia-panel">
                    <div className="card-header aon-card-header"><h4><i className="fa fa-share-alt"></i> Médias sociaux</h4></div>
                      <div className="card-body aon-card-body">
                        <div className="row">
                            <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Facebook</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-facebook"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Twitter</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-twitter"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>LinkedIn</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-linkedin"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Pinterest</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-pinterest"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Digg</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-digg"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Instagram</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-instagram"></i>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div> 
                  
                  <div className="card aon-card" id="aon-passUpdate-panel">
                    <div className="card-header aon-card-header"><h4><i className="fa fa-lock"></i> Mise à jour du mot de passe</h4></div>
                      <div className="card-body aon-card-body">
                        <div className="row">
                            <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Nouveau mot de passe</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-lock"></i>
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label>Répéter le mot de passe</label>
                                      <div className="aon-inputicon-box"> 
                                          <input className="form-control sf-form-control" name="company_name" type="text"/>
                                          <i className="aon-input-icon fa fa-lock"></i>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <p>Entrez le même mot de passe dans les deux champs. Utilisez une lettre majuscule et un chiffre pour un mot de passe plus fort.</p>
                      </div>
                  </div>

                  <div className="card aon-card" id="aon-category-panel">
                    <div className="card-header aon-card-header"><h4><i className="fa fa-list-alt"></i> Catégorie</h4></div>
                      <div className="card-body aon-card-body">
                        <div className="row">
                            <div className="col-md-12">
                                  <div className="form-group">
                                      <label>Catégorie</label>
                                      <div className="alert alert-info">Actuellement, vous pouvez choisir 10 catégories. Vous pouvez augmenter ce nombre en mettant à niveau votre plan d'adhésion.</div>
                                      <select className="selectpicker" multiple data-live-search="true">
                                          <option>Blanchisserie</option>
                                          <option>Services de taxi</option>
                                          <option>Concessionnaire automobile</option>
                                          <option>Organisateur d'événements</option>
                                        </select>
                                  </div>
                              </div>
                              <div className="col-md-12">
                                  <div className="form-group">
                                      <label>Catégorie principale</label>
                                      <div className="radio-inline-box">
                                          <div className="checkbox sf-radio-checkbox">
                                              <input id="lau1" name="abc" value="five" type="radio"/>
                                              <label htmlFor="lau1">Blanchisserie</label>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <p>Entrez le même mot de passe dans les deux champs. Utilisez une lettre majuscule et un chiffre pour un mot de passe plus fort.</p>
                      </div>
                  </div>

                  <div className="card aon-card" id="aon-amenities-panel">
                    <div className="card-header aon-card-header"><h4><i className="fa fa-shield"></i> Équipements</h4></div>
                      <div className="card-body aon-card-body">
                        <div className="row">
                              <div className="col-md-12">
                                  <div className="form-group">
                                      <label>Équipements</label>
                                      <select className="selectpicker" multiple data-live-search="true">
                                          <option>Blanchisserie</option>
                                          <option>Services de taxi</option>
                                          <option>Concessionnaire automobile</option>
                                          <option>Organisateur d'événements</option>
                                        </select>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="card aon-card" id="aon-languages-panel">
                    <div className="card-header aon-card-header"><h4><i className="fa fa-language"></i> Langues</h4></div>
                      <div className="card-body aon-card-body">
                        <div className="row">
                              <div className="col-md-12">
                                  <div className="form-group">
                                      <label>Langues</label>
                                      <select className="selectpicker" multiple data-live-search="true">
                                          <option>Blanchisserie</option>
                                          <option>Services de taxi</option>
                                          <option>Concessionnaire automobile</option>
                                          <option>Organisateur d'événements</option>
                                        </select>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="card aon-card" id="aon-gallery-panel">
                    <div className="card-header aon-card-header"><h4><i className="fa fa-image"></i> Images de la galerie</h4></div>
                      <div className="card-body aon-card-body">
                        <form action="upload.php" className="dropzone dropzone-custom"></form>
                      </div>
                  </div>
                  
                  <div className="card aon-card" id="aon-video-panel">
                    <div className="card-header aon-card-header"><h4><i className="fa fa-video-camera"></i> Téléchargement de vidéo</h4></div>
                      <div className="card-body aon-card-body">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Insérez l'URL de la vidéo YouTube, Vimeo ou Facebook" aria-label="Nom d'utilisateur du destinataire"/>
                            <div className="input-group-append">
                              <button className="btn admin-button" type="button">Aperçu</button>
                            </div>
                          </div>
                      </div>
                  </div>
    </>
  )
}
