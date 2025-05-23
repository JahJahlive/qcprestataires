import React from 'react'

function Reservations() {
  return (
    <>
    <div className="aon-admin-heading">
      <h4>Mes Réservations</h4>
    </div>

    <div className="card aon-card">
      <div className="card-body aon-card-body">
        <div className="sf-bd-data-tb-head">
          <button
            className="admin-button"
            data-toggle="modal"
            data-target="#downloadreport"
            type="button"
            aria-label="Télécharger le rapport"
          >
            <i className="fa fa-plus"></i>
            Télécharger le rapport
          </button>
        </div>

        {/* Week Tabs */}
        <div className="sf-availability-times-tab m-b50">
          <div className="sf-custom-tabs sf-custom-new">
            {/* Tabs */}
            <ul className="nav nav-tabs nav-table-cell">
              <li>
                <a data-toggle="tab" href="#Upcoming" className="active">
                  À venir
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#Past">
                  Passées
                </a>
              </li>
            </ul>
            {/* Tabs Content */}
            <div className="tab-content">
              {/* Upcoming */}
              <div id="Upcoming" className="tab-pane active">
                <div className="sf-tabs-content">
                  <div className="sf-bs-data-table">
                    <div className="table-responsive">
                      <table
                        className="table table-striped table-bordered example-dt-table aon-booking-table"
                        style={{ width: '100%' }}
                      >
                        <thead>
                          <tr>
                            <th>
                              <div className="checkbox sf-radio-checkbox">
                                <input id="th1_1" name="abc" value="five" type="radio" />
                                <label htmlFor="th1_1">
                                  <span className="btn btn-danger btn-xs" title="Supprimer">
                                    <i className="fa fa-trash-o"></i>
                                  </span>
                                </label>
                              </div>
                            </th>
                            <th>Informations de réservation</th>
                            <th>Informations de paiement</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { id: '1115', inputId: 'td2_2' },
                            { id: '1114', inputId: 'td2' },
                            { id: '11113', inputId: 'td3' },
                            { id: '11123', inputId: 'td4' },
                          ].map((booking) => (
                            <tr key={booking.id}>
                              <td>
                                <div className="checkbox sf-radio-checkbox">
                                  <input
                                    id={booking.inputId}
                                    name="abc"
                                    value="five"
                                    type="radio"
                                  />
                                  <label htmlFor={booking.inputId}></label>
                                </div>
                              </td>
                              <td>
                                <div className="sf-booking-info-col">
                                  <span className="sf-booking-refid">#{booking.id}</span>
                                  <span className="booking-status sf-booking-incomplete">
                                    Incomplète
                                  </span>
                                  <div className="sf-booking-upcoming">Travail</div>
                                  <div className="sf-booking-customer">
                                    <ul className="customer-info">
                                      <li>
                                        <strong>
                                          <i className="fa fa-user"></i> Nom de l'agent
                                        </strong>{' '}
                                        Heima Agency
                                      </li>
                                      <li>
                                        <strong>
                                          <i className="fa fa-user"></i> Nom du client
                                        </strong>{' '}
                                        LAURA BARRERA
                                      </li>
                                      <li>
                                        <strong>
                                          <i className="fa fa-phone"></i> Téléphone du client
                                        </strong>{' '}
                                        +52 81 1911 2887
                                      </li>
                                      <li>
                                        <strong>
                                          <i className="fa fa-calendar-o"></i> Date
                                        </strong>{' '}
                                        2021-12-26
                                      </li>
                                      <li>
                                        <strong>
                                          <i className="fa fa-clock-o"></i> Heure
                                        </strong>{' '}
                                        13:25:00
                                      </li>
                                    </ul>
                                  </div>
                                  <button
                                    type="button"
                                    className="admin-button assignButton margin-r-10"
                                  >
                                    <i className="fa fa-user"></i>
                                    Assigner maintenant
                                  </button>
                                </div>
                              </td>
                              <td>
                                <div className="inner">
                                  <h3>
                                    <span
                                      className="sf-booking-payment-info"
                                      data-toggle="popover"
                                      data-container="body"
                                      data-placement="top"
                                      data-html="true"
                                      id={`payinfo-${booking.id}`}
                                      data-trigger="hover"
                                    >
                                      85.00€
                                    </span>
                                    <span className="sf-payment-status">Payé</span>
                                  </h3>
                                  <div
                                    id={`popover-content-payinfo-${booking.id}`}
                                    className="hide sf-pop-hide"
                                  >
                                    <ul className="list-unstyled margin-0 booking-payment-data">
                                      <li>
                                        <strong>Montant total :</strong> 85.00€
                                      </li>
                                      <li>
                                        <strong>Frais des prestataires :</strong> 57.00€
                                      </li>
                                      <li>
                                        <strong>Frais administratifs :</strong> 28.00€
                                      </li>
                                      <li>
                                        <strong>Méthode de paiement :</strong>
                                      </li>
                                      <li>
                                        <strong>Paiement admin aux prestataires :</strong>{' '}
                                        En attente
                                      </li>
                                      <li>
                                        <strong>ID de transaction :</strong> NA
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="admin-button btn-sm viewBookings"
                                  title="Voir la réservation"
                                >
                                  <i className="fa fa-eye"></i>
                                </button>
                                <button
                                  type="button"
                                  className="admin-button btn-sm"
                                  title="Changer le statut"
                                >
                                  <i className="fa fa-battery-half"></i>
                                </button>
                                <button
                                  type="button"
                                  className="admin-button btn-sm addInvoice margin-r-5"
                                  title="Ajouter une facture"
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Past */}
              <div id="Past" className="tab-pane">
                <div className="sf-tabs-content">
                  <div className="sf-bs-data-table">
                    <div className="table-responsive">
                      <table
                        className="table table-striped table-bordered example-dt-table aon-booking-table"
                        style={{ width: '100%' }}
                      >
                        <thead>
                          <tr>
                            <th>
                              <div className="checkbox sf-radio-checkbox">
                                <input id="2th1" name="abc" value="five" type="radio" />
                                <label htmlFor="2th1">
                                  <span className="btn btn-danger btn-xs" title="Supprimer">
                                    <i className="fa fa-trash-o"></i>
                                  </span>
                                </label>
                              </div>
                            </th>
                            <th>Informations de réservation</th>
                            <th>Informations de paiement</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { id: '1118', inputId: '2td1' },
                            { id: '1111', inputId: '2td2' },
                            { id: '11153', inputId: '2td3' },
                            { id: '1119', inputId: '2td4' },
                          ].map((booking) => (
                            <tr key={booking.id}>
                              <td>
                                <div className="checkbox sf-radio-checkbox">
                                  <input
                                    id={booking.inputId}
                                    name="abc"
                                    value="five"
                                    type="radio"
                                  />
                                  <label htmlFor={booking.inputId}></label>
                                </div>
                              </td>
                              <td>
                                <div className="sf-booking-info-col">
                                  <span className="sf-booking-refid">#{booking.id}</span>
                                  <span className="booking-status sf-booking-incomplete">
                                    Incomplète
                                  </span>
                                  <div className="sf-booking-upcoming">Travail</div>
                                  <div className="sf-booking-customer">
                                    <ul className="customer-info">
                                      <li>
                                        <strong>
                                          <i className="fa fa-user"></i> Nom de l'agent
                                        </strong>{' '}
                                        Heima Agency
                                      </li>
                                      <li>
                                        <strong>
                                          <i className="fa fa-user"></i> Nom du client
                                        </strong>{' '}
                                        LAURA BARRERA
                                      </li>
                                      <li>
                                        <strong>
                                          <i className="fa fa-phone"></i> Téléphone du client
                                        </strong>{' '}
                                        +52 81 1911 2887
                                      </li>
                                      <li>
                                        <strong>
                                          <i className="fa fa-calendar-o"></i> Date
                                        </strong>{' '}
                                        2021-12-26
                                      </li>
                                      <li>
                                        <strong>
                                          <i className="fa fa-clock-o"></i> Heure
                                        </strong>{' '}
                                        13:25:00
                                      </li>
                                    </ul>
                                  </div>
                                  <button
                                    type="button"
                                    className="admin-button assignButton margin-r-10"
                                  >
                                    <i className="fa fa-user"></i>
                                    Assigner maintenant
                                  </button>
                                </div>
                              </td>
                              <td>
                                <div className="inner">
                                  <h3>
                                    <span
                                      className="sf-booking-payment-info"
                                      data-toggle="popover"
                                      data-container="body"
                                      data-placement="top"
                                      data-html="true"
                                      id={`payinfo-${booking.id}`}
                                      data-trigger="hover"
                                    >
                                      85.00€
                                    </span>
                                    <span className="sf-payment-status">Payé</span>
                                  </h3>
                                  <div
                                    id={`popover-content-payinfo-${booking.id}`}
                                    className="hide sf-pop-hide"
                                  >
                                    <ul className="list-unstyled margin-0 booking-payment-data">
                                      <li>
                                        <strong>Montant total :</strong> 85.00€
                                      </li>
                                      <li>
                                        <strong>Frais des prestataires :</strong> 57.00€
                                      </li>
                                      <li>
                                        <strong>Frais administratifs :</strong> 28.00€
                                      </li>
                                      <li>
                                        <strong>Méthode de paiement :</strong>
                                      </li>
                                      <li>
                                        <strong>Paiement admin aux prestataires :</strong>{' '}
                                        En attente
                                      </li>
                                      <li>
                                        <strong>ID de transaction :</strong> NA
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="admin-button btn-sm viewBookings"
                                  title="Voir la réservation"
                                >
                                  <i className="fa fa-eye"></i>
                                </button>
                                <button
                                  type="button"
                                  className="admin-button btn-sm"
                                  title="Changer le statut"
                                >
                                  <i className="fa fa-battery-half"></i>
                                </button>
                                <button
                                  type="button"
                                  className="admin-button btn-sm addInvoice margin-r-5"
                                  title="Ajouter une facture"
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Reservations