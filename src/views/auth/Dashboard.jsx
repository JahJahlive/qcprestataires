import React from 'react'

export default function Dashboard() {

  return (
    <div>
    <div className="row">
      <div className="col-xl-8 col-lg-12 m-b30 break-1300">
        <div className="card aon-card">
          <div className="card-body aon-card-body">
            <div className="row">
              <div className="col-lg-4 m-b30">
                <div className="panel panel-default ser-card-default">
                  <div className="panel-body ser-card-body ser-puple p-a30">
                    <div className="ser-card-title">Wallet</div>
                    <div className="ser-card-icons">
                      <img src="images/wallet.png" alt="" />
                    </div>
                    <div className="ser-card-amount">$252.45</div>
                    <div className="ser-card-table">
                      <div className="ser-card-left">
                        <div className="ser-card-total">
                          <div className="ser-total-table">
                            <div className="ser-total-cell1">Total</div>
                          </div>
                        </div>
                      </div>
                      <div className="ser-card-right">
                        <div className="ser-card-icon">
                          <i className="glyph-icon flaticon-money-3"></i>
                        </div>
                      </div>
                    </div>
                    <span className="ser-card-circle-bg"></span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 m-b30">
                <div className="panel panel-default ser-card-default">
                  <div className="panel-body ser-card-body ser-orange p-a30">
                    <div className="ser-card-title">Booking</div>
                    <div className="ser-card-icons">
                      <img src="images/booking.png" alt="" />
                    </div>
                    <div className="ser-card-amount">465</div>
                    <div className="ser-card-table">
                      <div className="ser-card-left">
                        <div className="ser-card-total">
                          <div className="ser-total-table">
                            <div className="ser-total-cell1">Wallet</div>
                          </div>
                        </div>
                      </div>
                      <div className="ser-card-right">
                        <div className="ser-card-icon">
                          <i className="glyph-icon flaticon-wallet"></i>
                        </div>
                      </div>
                    </div>
                    <span className="ser-card-circle-bg"></span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 m-b30">
                <div className="panel panel-default ser-card-default">
                  <div className="panel-body ser-card-body ser-blue p-a30">
                    <div className="ser-card-title">Earning</div>
                    <div className="ser-card-icons">
                      <img src="images/earning.png" alt="" />
                    </div>
                    <div className="ser-card-amount">$124.00</div>
                    <div className="ser-card-table">
                      <div className="ser-card-left">
                        <div className="ser-card-total">
                          <div className="ser-total-table">
                            <div className="ser-total-cell1">Complete</div>
                          </div>
                        </div>
                      </div>
                      <div className="ser-card-right">
                        <div className="ser-card-icon">
                          <i className="glyph-icon flaticon-calendar"></i>
                        </div>
                      </div>
                    </div>
                    <span className="ser-card-circle-bg"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-xl-8 m-b30">
        <div className="card aon-card">
          <div className="card-header aon-card-header aon-card-header2">
            <h4>
              <i className="feather-pie-chart"></i> Booking
            </h4>
          </div>
          <div className="card-body aon-card-body">
            <div className="dx-viewport demo-container">
              <div id="chart-demo">
                <div id="chart">
                  {/* Placeholder for chart component, e.g., DevExtreme Chart */}
                </div>
                <div className="action">
                  <div className="label">Choose a temperature threshold, °C: </div>
                  <div id="choose-temperature">
                    {/* Placeholder for temperature selector component */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-4">
        <div className="card aon-card">
          <div className="card-header aon-card-header aon-card-header2">
            <h4>
              <i className="feather-pie-chart"></i> Booking Stats
            </h4>
          </div>
          <div className="card-body aon-card-body">
            <div>
              <ul className="list-unstyled">
                <li className="py-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar-xs rounded-circle m-r10">
                      <i className="feather-check-circle"></i>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-2">Completed</p>
                      <div className="progress progress-sm animated-progess">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: '70%' }}
                          aria-valuenow="70"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar-xs rounded-circle m-r10">
                      <i className="feather-calendar"></i>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-2">Pending</p>
                      <div className="progress progress-sm animated-progess">
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: '45%' }}
                          aria-valuenow="45"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="d-flex align-items-center">
                    <div className="avatar-xs align-self-center me-3">
                      <div className="avatar-xs rounded-circle m-r10">
                        <i className="feather-x-circle"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-2">Cancel</p>
                      <div className="progress progress-sm animated-progess">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: '19%' }}
                          aria-valuenow="19"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <hr />
            <div className="text-center">
              <div className="row aon-states-row">
                <div className="col-4">
                  <div className="mt-2">
                    <p className="text-muted mb-2">Completed</p>
                    <h5 className="font-size-16 mb-0">70</h5>
                  </div>
                </div>
                <div className="col-4">
                  <div className="mt-2">
                    <p className="text-muted mb-2">Pending</p>
                    <h5 className="font-size-16 mb-0">45</h5>
                  </div>
                </div>
                <div className="col-4">
                  <div className="mt-2">
                    <p className="text-muted mb-2">Cancel</p>
                    <h5 className="font-size-16 mb-0">19</h5>
                  </div>
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
