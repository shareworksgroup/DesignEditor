import React from 'react'
import ReactDOM from 'react-dom'

class Modal extends React.Component {

  constructor(props) {
    super(props)
    // this.modal = React.createRef()
  }

  componentDidMount() {
  }


  render() {
    return ReactDOM.createPortal(
      <div class="modal fade" id="advanSearch" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            {this.props.children}
            {/* <div class="modal-body scrollbar">
              <a href="javascript:void(0)" class="modal-title" data-dismiss="modal" aria-label="Close"><i class="mdi-content-clear"></i><span>Advanced Search</span></a>
              <form>
                <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <label>WO #</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label>Group</label>
                      <select class="form-control search-select" data-placeholder="Filter by Group">
                        <option value="2">0319</option>
                        <option value="1">0389</option>
                        <option value="10">123</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Property Manager</label>
                      <select class="form-control search-select" data-placeholder="Filter by District">
                        <option value="2">0319</option>
                        <option value="1">0389</option>
                        <option value="10">123</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Service Type</label>
                      <select class="form-control search-select" data-placeholder="Filter by Service Type">
                        <option value="1">Filter by Service Type</option>
                        <option value="2">Floor Care</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Customer WO #</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label>Address</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label>Zip/Post</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label>Service Date Range</label>
                      <input type="text" class="form-control" id="dateRangeDemo1" />
                    </div>
                    <div class="form-group">
                      <label>Create Month</label>
                      <input type="text" class="form-control" id="justMonthDemo" />
                    </div>
                    <div class="form-group">
                      <label>Move-In Date Range</label>
                      <input type="text" class="form-control" id="dateRangeDemo2" />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="form-group">
                      <label>Status</label>
                      <select class="form-control search-select" data-placeholder="Filter by WO Status">
                        <option value="25">Billed</option>
                        <option value="7">Completed</option>
                        <option value="10">Deferred</option>
                        <option value="8">Expired</option>
                        <option value="3">In Progress</option>
                        <option value="4">Missed</option>
                        <option value="2">Scheduled</option>
                        <option value="6">Pay to Affiliate</option>
                        <option value="5">Rescheduled</option>
                        <option value="9">Resolved Without Invoice</option>
                        <option value="1">Unscheduled</option>
                        <option value="11">Void</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Region</label>
                      <select class="form-control search-select" data-placeholder="Filter by Region">
                        <option value="2">0319</option>
                        <option value="1">0389</option>
                        <option value="10">123</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Service Category</label>
                      <select class="form-control search-select" data-placeholder="Filter by Service Category">
                        <option value="1">Air Conditioning/Heating</option>
                        <option value="2">Appliances</option>
                        <option value="3">Cabinets/Countertops</option>
                        <option value="4">Doors/Windows/Siding</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Problem Code</label>
                      <select class="form-control search-select" data-placeholder="Filter by Problem Code">
                        <option value="1">Filter by Problem Code</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Property #</label>
                      <select class="form-control search-select" data-placeholder="Filter by Property #">
                        <option value="1">Filter by Property #</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>State</label>
                      <select class="form-control search-select" data-placeholder="Filter by State">
                        <option value="1">AL</option>
                        <option value="2">AK</option>
                        <option value="3">AZ</option>
                        <option value="4">AR</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>City</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label>Schedule Date Range</label>
                      <input type="text" class="form-control" id="justTimeDemo" />
                    </div>
                    <div class="form-group">
                      <label>Schedule Date Range</label>
                      <input type="text" class="form-control" id="justDateDemo" />
                    </div>
                    <div class="form-group">
                      <label>Managed/Owned</label>
                      <select class="form-control search-select">
                        <option value="1">ALL</option>
                        <option value="2">Invitation Homes</option>
                        <option value="3">CAH Managed</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Charge Back</label>
                      <select class="form-control search-select">
                        <option value="1">ALL</option>
                        <option value="2">Yes</option>
                        <option value="3">NO</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" />
                          <span>Mobile</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="pull-right">
                      <button type="button" class="btn btn-default m0"><i class="fa fa-undo"></i></button>
                      <button type="button" class="btn btn-primary btn-long"><i class="fa fa-search"></i></button>
                    </div>
                  </div>
                </div>
              </form>
            </div> */}
          </div>
        </div>
      </div>,
      document.body
    )
  }

}

export default Modal