import React from 'react'

class BootInput extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <div className="search-group">
      <input type="text" className="form-control dropdown-toggle" placeholder="Propety #" data-toggle="dropdown" />
      <ul className="dropdown-menu multi-select-dropdown multi-select-dropdown-line">
        <li>
          <a href="javascript:void(0)">LA-1234,Dodson ,LA 71422 aaron</a>
        </li>
        <li>
          <a href="javascript:void(0)">LA-1234,Dodson ,LA 71422 aaron1</a>
        </li>
        <li>
          <a href="javascript:void(0)">LA-1234,Dodson ,LA 71422 aaron2</a>
        </li>
        <li>
          <a href="javascript:void(0)">5472 NY-104 #23,Williamson ,NY 14589 AutoTest</a>
        </li>
        <li>
          <a href="javascript:void(0)">Phoenix Invitation Homes,Dallas ,TX 75313 azph0000</a>
        </li>
        <li>
          <a href="javascript:void(0)">LA-1234,Dodson ,LA 71422 aaron2</a>
        </li>
        <li>
          <a href="javascript:void(0)">5472 NY-104 #23,Williamson ,NY 14589 AutoTest</a>
        </li>
      </ul>
    </div>
  }

}

export default BootInput