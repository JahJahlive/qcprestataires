import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useStateContext } from '../context/ContextProvider';

// Reusable InputField component
const InputField = ({ iconClass, ...props }) => (
  <div className="form-group">
    <div className="aon-inputicon-box">
      <input
        className="form-control sf-form-control"
        {...props}
        required
      />
      <i className={`aon-input-icon ${iconClass}`}></i>
    </div>
  </div>
);

function LoginModal() {
  const [activeTab, setActiveTab] = useState('signup');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setToken, setUser } = useStateContext();
  const navigate = useNavigate();

  // State for login form
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // State for signup form
  const [signupForm, setSignupForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  // Reset modal state
  const resetModal = () => {
    setLoginForm({ email: '', password: '' });
    setSignupForm({
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    });
    setError(null);
    setActiveTab('signup'); // Reset to default tab
  };

  // Close modal and remove backdrop
  const closeModal = () => {
    // Trigger close button click to close modal
    const closeButton = document.querySelector('#login-signup-model .btn-close');
    if (closeButton) {
      closeButton.click();
    }
    // Explicitly remove modal-backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
    // Ensure body doesn't retain modal-open class
    document.body.classList.remove('modal-open');
  };

  // Handle login form input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null); // Clear error on input change
  };

  // Handle signup form input changes
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null); // Clear error on input change
  };

  // Validate login form
  const validateLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      return 'Veuillez remplir tous les champs requis.';
    }
    if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      return 'Veuillez entrer un courriel valide.';
    }
    return null;
  };

  // Validate signup form
  const validateSignup = () => {
    if (
      !signupForm.role ||
      !signupForm.name ||
      !signupForm.phone ||
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword
    ) {
      return 'Veuillez remplir tous les champs requis.';
    }
    if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
      return 'Veuillez entrer un courriel valide.';
    }
    if (signupForm.password.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères.';
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      return 'Les mots de passe ne correspondent pas.';
    }
    return null;
  };

  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateLogin();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/login', loginForm);
      setToken(response.data.token);
      resetModal(); // Reset modal state
      closeModal(); // Close modal and remove backdrop
      navigate('/dashboard'); // Navigate to dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Connexion échouée');
    } finally {
      setLoading(false);
    }
  };

  // Handle signup form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateSignup();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/register', signupForm);
      setUser(response.data.user);
      setToken(response.data.token);
      resetModal(); // Reset modal state
      closeModal(); // Close modal and remove backdrop
      navigate('/dashboard'); // Navigate to dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Inscription échouée');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade" id="login-signup-model" tabIndex="-1" aria-labelledby="login-signup-model-label" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <button type="button" className="btn-close aon-login-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
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
                {/* Login Form */}
                <div className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`} id="Upcoming">
                  <div className="sf-tabs-content">
                    <form className="aon-login-form" onSubmit={handleLoginSubmit}>
                      <div className="row">
                        <div className="col-md-12">
                          <InputField
                            iconClass="fa fa-user"
                            name="email"
                            type="email"
                            placeholder="Courriel"
                            value={loginForm.email}
                            onChange={handleLoginChange}
                            aria-label="Adresse e-mail"
                          />
                        </div>
                        <div className="col-md-12">
                          <InputField
                            iconClass="fa fa-lock"
                            name="password"
                            type="password"
                            placeholder="Mot de passe"
                            value={loginForm.password}
                            onChange={handleLoginChange}
                            aria-label="Mot de passe"
                          />
                        </div>
                        <div className="col-md-12">
                          <div className="form-group d-flex aon-login-option justify-content-between">
                            <div className="aon-login164-opleft">
                              <div className="checkbox sf-radio-checkbox"></div>
                            </div>
                            <div className="aon-login-opright">
                              <a href="#">Mot de passe oublié ?</a>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button type="submit" className="site-button w-100" disabled={loading}>
                            {loading ? 'Chargement...' : 'Soumettre'} <i className="feather-arrow-right"></i>
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
                          <select
                            name="role"
                            value={signupForm.role}
                            onChange={handleSignupChange}
                            className="form-control sf-form-control"
                            aria-label="Type de compte"
                          >
                            <option value="">Sélectionner le type de compte</option>
                            <option value="client">Client</option>
                            <option value="prestataire">Prestataire</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <InputField
                            iconClass="fa fa-user"
                            name="name"
                            type="text"
                            placeholder="Nom complet"
                            value={signupForm.name}
                            onChange={handleSignupChange}
                            aria-label="Nom complet"
                          />
                        </div>
                        <div className="col-md-12">
                          <InputField
                            iconClass="fa fa-phone"
                            name="phone"
                            type="tel"
                            placeholder="Téléphone"
                            value={signupForm.phone}
                            onChange={handleSignupChange}
                            aria-label="Numéro de téléphone"
                          />
                        </div>
                        <div className="col-md-12">
                          <InputField
                            iconClass="fa fa-envelope-o"
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            value={signupForm.email}
                            onChange={handleSignupChange}
                            aria-label="Adresse e-mail"
                          />
                        </div>
                        <div className="col-md-12">
                          <InputField
                            iconClass="fa fa-lock"
                            name="password"
                            type="password"
                            placeholder="Mot de passe"
                            value={signupForm.password}
                            onChange={handleSignupChange}
                            aria-label="Mot de passe"
                          />
                        </div>
                        <div className="col-md-12">
                          <InputField
                            iconClass="fa fa-lock"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirmer le mot de passe"
                            value={signupForm.confirmPassword}
                            onChange={handleSignupChange}
                            aria-label="Confirmer le mot de passe"
                          />
                        </div>
                        <div className="col-md-12">
                          <button type="submit" className="site-button w-100" disabled={loading}>
                            {loading ? 'Chargement...' : 'Soumettre'} <i className="feather-arrow-right"></i>
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
  );
}

export default LoginModal;