import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

function LoginModal() {
   // State for active tab
   const [activeTab, setActiveTab] = useState('signup'); // Default to signup as per original code
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);
   let navigate = useNavigate();

   // State for login form
   const [loginForm, setLoginForm] = useState({
     email: '',
     password: ''
   });
 
   // State for signup form
   const [signupForm, setSignupForm] = useState({
     name: '',
     phone: '',
     email: '',
     password: '',
     confirmPassword: '',
     role: ''
   });
 
   // Handle login form input changes
   const handleLoginChange = (e) => {
     const { name, value, type, checked } = e.target;
     setLoginForm((prev) => ({
       ...prev,
       [name]: type === 'checkbox' ? checked : value,
     }));
   };
 
   // Handle signup form input changes
   const handleSignupChange =  (e) => {
     const { name, value, type, checked } = e.target;
     setSignupForm((prev) => ({
       ...prev,
       [name]: type === 'checkbox' ? checked : value,
     }));
   };
 
   // Handle login form submission
   const handleLoginSubmit = async (e) => {
     e.preventDefault();  console.log('Login Form Submitted:', loginForm);
     // Basic validation
     if (!loginForm.email || !loginForm.password) {
       alert('Veuillez remplir tous les champs requis.');
       return;
     }
     // Simulate API call
     console.log('Login Form Submitted:', loginForm);
     // Reset form (optional)
   //  setLoginForm({ username: '', password: '', keepLogged: false });

   
      try {
        const response = await api.post('/login', loginForm);
        localStorage.setItem('token', response.data.token);
        setSuccess('Connexion reussie!');
        setError(null)
        return navigate("/dashboard");
      } catch (err) {
        setError(err.response?.data?.message || 'Connexion échouée');
        setSuccess(null);
      }
   };
 
   // Handle signup form submission
   const handleSignupSubmit = async (e) => {
     e.preventDefault();
     // Basic validation
     if (
      !signupForm.role ||
       !signupForm.name ||
       !signupForm.phone ||
       !signupForm.email ||
       !signupForm.password ||
       !signupForm.confirmPassword
     ) {
       alert('Veuillez remplir tous les champs requis et accepter les conditions.');
       return;
     }
     if (signupForm.password !== signupForm.confirmPassword) {
       alert('Les mots de passe ne correspondent pas.');
       return;
     }
     // Simulate API call
     console.log('Signup Form Submitted:', signupForm);
     // Reset form (optional)
    //  setSignupForm({
    //    name: '',
    //    phone: '',
    //    email: '',
    //    password: '',
    //    confirmPassword: ''
    //  });

     try {
      const response = await api.post('/register', signupForm);
      localStorage.setItem('token', response.data.token);
      setSuccess('Inscription reussie!');
      setError(null);
      return <Navigate to="/dashboard" />
    } catch (err) {
      setError(err.response?.data?.message || 'Inscription échouée');
      setSuccess(null);
    }
   };
 

   return (
    <div className="modal fade" id="login-signup-model" tabIndex="-1" aria-labelledby="login-signup-model-label" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <button type="button" className="btn-close aon-login-close" data-bs-dismiss="modal" aria-label="Close"> <span aria-hidden="true">×</span></button>
          <div className="modal-body">
            <div className="sf-custom-tabs sf-custom-new aon-logon-sign-area p-3">
              {/* Tabs */}
              <ul className="nav nav-tabs nav-table-cell">
                <li>
                  <a
                    className={activeTab === 'login' ? 'active' : ''}
                    onClick={() => setActiveTab('login')}
                    href="#Upcoming"
                  >
                    Connexion
                  </a>
                </li>
                <li>
                  <a
                    className={activeTab === 'signup' ? 'active' : ''}
                    onClick={() => setActiveTab('signup')}
                    href="#Past"
                  >
                    Inscription
                  </a>
                </li>
              </ul>
              {/* Tabs Content */}
              <div className="tab-content">
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {success && <p style={{ color: 'green' }}>{success}</p>}
                {/* Login Form */}
                <div className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`} id="Upcoming">
                  <div className="sf-tabs-content">
                    <form className="aon-login-form" onSubmit={handleLoginSubmit}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="aon-inputicon-box">
                              <input
                                className="form-control sf-form-control"
                                name="email"
                                type="email"
                                placeholder="Courriel"
                                value={loginForm.email}
                                onChange={handleLoginChange}
                                required
                              />
                              <i className="aon-input-icon fa fa-user"></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="aon-inputicon-box">
                              <input
                                className="form-control sf-form-control"
                                name="password"
                                type="password"
                                placeholder="Mot de passe"
                                value={loginForm.password}
                                onChange={handleLoginChange}
                                required
                              />
                              <i className="aon-input-icon fa fa-lock"></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group d-flex aon-login-option justify-content-between">
                            <div className="aon-login164-opleft">
                              <div className="checkbox sf-radio-checkbox">
                              </div>
                            </div>
                            <div className="aon-login-opright">
                              <a href="#">Mot de passe oublié ?</a>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button type="submit" className="site-button w-100">
                            Soumettre <i className="feather-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* Sign up Form */}
                <div className={`tab-pane fade ${activeTab === 'signup' ? 'show active' : ''}`} id="Past">
                  <div className="sf-tabs-content">
                    <form className="aon-login-form" onSubmit={handleSignupSubmit}>
                    <div className="col-md-12">
                          <div className="form-group">
                             <select name="role" id="" value={signupForm.role} onChange={handleSignupChange} className="form-control sf-form-control">
                              <option value="">Sélectionner le type de compte</option>
                              <option value="client">Client</option>
                              <option value="prestataire">Prestataire</option>
                             </select>
                          </div>
                        </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="aon-inputicon-box">
                              <input
                                className="form-control sf-form-control"
                                name="name"
                                type="text"
                                placeholder="Nom complet"
                                value={signupForm.name}
                                onChange={handleSignupChange}
                                required
                              />
                              <i className="aon-input-icon fa fa-user"></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="aon-inputicon-box">
                              <input
                                className="form-control sf-form-control"
                                name="phone"
                                type="tel"
                                placeholder="Téléphone"
                                value={signupForm.phone}
                                onChange={handleSignupChange}
                                required
                              />
                              <i className="aon-input-icon fa fa-phone"></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="aon-inputicon-box">
                              <input
                                className="form-control sf-form-control"
                                name="email"
                                type="email"
                                placeholder="E-mail"
                                value={signupForm.email}
                                onChange={handleSignupChange}
                                required
                              />
                              <i className="aon-input-icon fa fa-envelope-o"></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="aon-inputicon-box">
                              <input
                                className="form-control sf-form-control"
                                name="password"
                                type="password"
                                placeholder="Mot de passe"
                                value={signupForm.password}
                                onChange={handleSignupChange}
                                required
                              />
                              <i className="aon-input-icon fa fa-lock"></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="aon-inputicon-box">
                              <input
                                className="form-control sf-form-control"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirmer le mot de passe"
                                value={signupForm.confirmPassword}
                                onChange={handleSignupChange}
                                required
                              />
                              <i className="aon-input-icon fa fa-lock"></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button type="submit" className="site-button w-100">
                            Soumettre <i className="feather-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default LoginModal