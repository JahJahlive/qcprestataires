import React, { useEffect, useState } from 'react'

function Abonnements() {
    // Countdown timer state
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  
    // Sample plans data
    const plans = [
      {
        name: 'Argent',
        price: 'USD',
        features: [
          'Réservations',
          'Image de couverture',
          'Images de la galerie',
          'Catégories multiples',
          'Nombre de catégories',
          'Postuler à un emploi',
          'Alertes d\'emploi',
          'Succursales',
          'Google Agenda',
          'Facture',
          'Disponibilité',
          'Membres du personnel',
        ],
        isSelected: false,
      },
      {
        name: 'Or',
        price: '20 USD',
        features: [
          'Réservations',
          'Image de couverture',
          'Images de la galerie',
          'Catégories multiples',
          'Nombre de catégories',
          'Postuler à un emploi',
          'Alertes d\'emploi',
          'Succursales',
          'Google Agenda',
          'Facture',
          'Disponibilité',
          'Membres du personnel',
        ],
        isSelected: true,
      },
      {
        name: 'Bronze',
        price: '50 USD',
        features: [
          'Réservations',
          'Image de couverture',
          'Images de la galerie',
          'Catégories multiples',
          'Nombre de catégories',
          'Postuler à un emploi',
          'Alertes d\'emploi',
          'Succursales',
          'Google Agenda',
          'Facture',
          'Disponibilité',
          'Membres du personnel',
        ],
        isSelected: false,
      },
    ];
  
    // Countdown timer logic
    useEffect(() => {
      const targetDate = new Date('2025-06-01T00:00:00'); // Example target date
      const updateTimer = () => {
        const now = new Date();
        const timeDiff = targetDate - now;
  
        if (timeDiff <= 0) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }
  
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
        setTimeLeft({ days, hours, minutes, seconds });
      };
  
      updateTimer();
      const interval = setInterval(updateTimer, 1000);
  
      return () => clearInterval(interval);
    }, []);

  return (
    <>
      <div className="card aon-card">
        <div className="card-header aon-card-header">
          <h4>
            <i className="fa fa-gear"></i> Mettre à niveau le compte
          </h4>
        </div>

        <div className="card-body aon-card-body">
          <div className="sf-upgrade-account-area">
            <div className="sf-upgrade-top-area">
              <div className="row">
                <div className="col-xl-6">
                  <div id="clockdiv" className="d-flex">
                    <div className="text-center mx-2">
                      <span className="days">{timeLeft.days}</span>
                      <div className="smalltext">Jours</div>
                    </div>
                    <div className="text-center mx-2">
                      <span className="hours">{timeLeft.hours}</span>
                      <div className="smalltext">Heures</div>
                    </div>
                    <div className="text-center mx-2">
                      <span className="minutes">{timeLeft.minutes}</span>
                      <div className="smalltext">Minutes</div>
                    </div>
                    <div className="text-center mx-2">
                      <span className="seconds">{timeLeft.seconds}</span>
                      <div className="smalltext">Secondes</div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 text-right">
                  <h4 className="sf-upgrade-top-title">
                    Votre plan actuel <span>Or</span>
                  </h4>
                  <button
                    className="admin-button sf-upgrade-btn"
                    aria-label="Renouveler votre plan"
                  >
                    Renouveler votre plan
                  </button>
                </div>
              </div>
            </div>
            <div className="sf-upgrade-bot-area">
              <div className="row justify-content-center">
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className="col-xl-4 col-lg-6 sf-upgrade-account-plans-area m-b30"
                  >
                    <div
                      className={`sf-upgrade-account-plans ${
                        plan.isSelected ? 'selected-plan' : ''
                      }`}
                    >
                      <div className="sf-plans-bx">
                        <h4 className="sf-plans-name">{plan.name}</h4>
                        <div className="sf-plans-price">{plan.price}</div>
                        <div className="sf-plan-list">
                          <ul>
                            {plan.features.map((feature, idx) => (
                              <li key={idx}>
                                <span>
                                  <i className="fa fa-check"></i> {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="sf-plans-done">
                      <i className="fa fa-check"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="sf-upgrade-account-btn">
            <button className="admin-button" aria-label="Continuer">
              Continuer
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Abonnements