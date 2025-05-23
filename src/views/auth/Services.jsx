import React from 'react'

function Services() { 
  return (
    <>
    <div className="aon-admin-heading">
      <h4>Mes Services</h4>
    </div>

    <div className="card aon-card">
      <div className="card-body aon-card-body">
        <div className="sf-bd-data-tb-head aon-mob-btn-marb">
          <button
            className="admin-button"
            data-toggle="modal"
            data-target="#exampleModal"
            type="button"
          >
            <i className="fa fa-plus"></i>
            Ajouter/Supprimer un groupe
          </button>
          <button
            className="admin-button m-l10"
            data-toggle="modal"
            data-target="#add_services"
            type="button"
          >
            <i className="fa fa-plus"></i>
            Ajouter un service
          </button>
        </div>

        <div className="sf-bs-data-table">
          <div className="table-responsive">
            <table className="table table-striped table-bordered example-dt-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Poste</th>
                  <th>Bureau</th>
                  <th>Âge</th>
                  <th>Date de début</th>
                  <th>Salaire</th>
                </tr>
              </thead>
              <tbody>
              
                <tr>
                  <td>Jonas Alexander</td>
                  <td>Developer</td>
                  <td>San Francisco</td>
                  <td>30</td>
                  <td>2010/07/14</td>
                  <td>$86,500</td>
                </tr>
                <tr>
                  <td>Shad Decker</td>
                  <td>Regional Director</td>
                  <td>Edinburgh</td>
                  <td>51</td>
                  <td>2008/11/13</td>
                  <td>$183,000</td>
                </tr>
                <tr>
                  <td>Michael Bruce</td>
                  <td>Javascript Developer</td>
                  <td>Singapore</td>
                  <td>29</td>
                  <td>2011/06/27</td>
                  <td>$183,000</td>
                </tr>
                <tr>
                  <td>Donna Snider</td>
                  <td>Customer Support</td>
                  <td>New York</td>
                  <td>27</td>
                  <td>2011/01/25</td>
                  <td>$112,000</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Nom</th>
                  <th>Poste</th>
                  <th>Bureau</th>
                  <th>Âge</th>
                  <th>Date de début</th>
                  <th>Salaire</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="modal fade content-admin-main" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add New Group</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="sf-md-padding">
                  <div class="form-group">
                      <label >Group Name</label>
                      <div class="aon-inputicon-box"> 
                          <input class="form-control sf-form-control" name="company_name" type="text"/>
                          <i class="aon-input-icon fa fa-user"></i>
                      </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="admin-button" data-dismiss="modal">Cancel</button>
                <button type="button" class="admin-button">Add Group</button>
              </div>
            </div>
          </div>
      </div>

      <div class="modal fade content-admin-main" id="add_services" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog model-w800" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel2">Add New Services</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body">
                  <div class="sf-md-padding">
                      <div class="row">
                          <div class="col-md-12"> 
                              <div class="form-group">
                                  <label>Services Name</label>
                                  <div class="aon-inputicon-box"> 
                                      <input class="form-control sf-form-control" name="company_name" type="text"/>
                                      <i class="aon-input-icon fa fa-user"></i>
                                  </div>
                              </div>
                          </div>
                      
                          <div class="col-md-12">
                              <div class="form-group">
                                  <label >Service Cost</label>
                                  <div class="aon-inputicon-box"> 

                                      <div class="radio-inline-box">

                                          <div class="checkbox sf-radio-checkbox sf-radio-check-2">
                                              <input id="loc1" name="abc" value="five" type="radio"/>
                                              <label for="loc1">Fixed Price </label>
                                          </div>
                                          <div class="checkbox sf-radio-checkbox sf-radio-check-2">
                                              <input id="loc2" name="abc" value="five" type="radio"/>
                                              <label for="loc2">Per Hour </label>
                                          </div>
                                          <div class="checkbox sf-radio-checkbox sf-radio-check-2">
                                              <input id="loc3" name="abc" value="five" type="radio"/>
                                              <label for="loc3">Per Person </label>
                                          </div>
                                          <div class="checkbox sf-radio-checkbox sf-radio-check-2">
                                              <input id="loc4" name="abc" value="five" type="radio"/>
                                              <label for="loc4">Days</label>
                                          </div>

                                      </div>
                                      
                                  </div>

                              </div>
                          </div>

                          <div class="col-md-12"> 
                              <div class="form-group">
                                  <label >Services Cost</label>
                                  <div class="aon-inputicon-box"> 
                                      <input class="form-control sf-form-control" name="company_name" type="text"/>
                                      <i class="aon-input-icon fa fa-dollar"></i>
                                  </div>
                              </div>
                          </div>

                          <div class="col-md-6"> 
                              <div class="form-group">
                                  <label>Padding Time (Before) </label>
                                  <select class="sf-select-box form-control sf-form-control bs-select-hidden form-control" name="before_padding_time" data-live-search="true" title="Padding Time (Before)"><option class="bs-title-option" value="">Padding Time (Before)</option>
                                      <option value="">Padding Time (Before)</option>
                                      <option value="5">5 Mins</option><option value="10">10 Mins</option><option value="15">15 Mins</option><option value="20">20 Mins</option><option value="25">25 Mins</option><option value="30">30 Mins</option><option value="35">35 Mins</option><option value="40">40 Mins</option><option value="45">45 Mins</option><option value="50">50 Mins</option><option value="55">55 Mins</option><option value="60">1 Hr</option><option value="75">1 Hr 15 Mins</option><option value="90">1 Hr 30 Mins</option><option value="105">1 Hr 45 Mins</option><option value="120">2 Hrs</option><option value="150">2 Hrs 30 Mins</option><option value="180">3 Hrs</option><option value="210">3 Hr 30 Mins</option><option value="240">4 Hrs</option>
                                  </select>
                              </div>
                          </div>

                          <div class="col-md-6"> 
                              <div class="form-group">
                                  <label>Padding Time (After)</label>
                                  <select class="sf-select-box form-control sf-form-control bs-select-hidden form-control" name="after_padding_time" data-live-search="true" title="Padding Time (After)"><option class="bs-title-option" value="">Padding Time (After)</option>
                                      <option value="">Padding Time (After)</option>
                                      <option value="5">5 Mins</option><option value="10">10 Mins</option><option value="15">15 Mins</option><option value="20">20 Mins</option><option value="25">25 Mins</option><option value="30">30 Mins</option><option value="35">35 Mins</option><option value="40">40 Mins</option><option value="45">45 Mins</option><option value="50">50 Mins</option><option value="55">55 Mins</option><option value="60">1 Hr</option><option value="75">1 Hr 15 Mins</option><option value="90">1 Hr 30 Mins</option><option value="105">1 Hr 45 Mins</option><option value="120">2 Hrs</option><option value="150">2 Hrs 30 Mins</option><option value="180">3 Hrs</option><option value="210">3 Hr 30 Mins</option><option value="240">4 Hrs</option>
                                  </select>
                              </div>
                          </div>

                          <div class="col-md-12"> 
                              <div class="form-group">
                                  <label>Padding Time (After)</label>
                                  <select class="sf-select-box form-control sf-form-control bs-select-hidden form-control" name="group_id" data-live-search="true" title="Select Group" id="group_id">
                                      <option class="bs-title-option" value="">Select Group</option>
                                                    
                                  </select>
                              </div>
                          </div>

                          <div class="col-md-12">
                              <div class="form-group">
                                <label>
                                  <a href="javascript:;" class="admin-button m-b10">
                                    <i class="fa fa-plus"></i> Add New Group</a>
                                  </label>
                                  
                                  <textarea class="form-control" rows="5"></textarea>
                                    
                              </div>
                            </div>
                          <div class="col-md-12">
                              <div class="form-group">
                                  <label>Offers & Permotions </label>
                                  <div class="aon-inputicon-box"> 

                                      <div class="radio-inline-box">
                                          <div class="checkbox sf-radio-checkbox sf-radio-check-2">
                                              <input id="lo1" name="abc" value="five" type="checkbox"/>
                                              <label for="lo1">Make Offer</label>
                                          </div>
                                      </div>
                                      
                                  </div>

                              </div>
                          </div>
                      

                      </div>
                  </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="admin-button" data-dismiss="modal">Cancel</button>
                <button type="button" class="admin-button">Create</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </>
  )
}

export default Services