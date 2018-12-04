import React from 'react'

class TopNav extends React.Component {

  render() {
    return <nav className="navbar">
      <div className="mobile-only-brand pull-left">
        <div className="nav-header pull-left">
          <a className="logo" href="index.html"><img src="../Sources/images/logo/sms-one@mini.png" alt="SMS ONE" /><span className="customer-logo"></span></a>
        </div>
        <a id="toggle_nav_btn" className="toggle-left-nav-btn inline-block pull-left d-md-block d-lg-none" href="javascript:void(0);"><i className="mdi-navigation-menu"></i></a>
      </div>
      <div className="mobile-only-nav pull-right">
        <ul className="nav top-nav pull-right">
          <li className="d-xs-none d-sm-block d-md-block d-lg-block">
            <a href="signin.html">Sign Out</a>
          </li>
          <li className="dropdown top-search d-xs-none d-sm-block d-md-block d-lg-block">
            <a data-toggle="dropdown" className="dropdown-toggle" href="javascript:void(0)" data-toggle-second="tooltip" data-placement="left" title="" data-original-title="Search">
              <i className="mdi-action-search"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-right top-search-menu">
              <li>
                <div className="input-group input-group-sm">
                  <input type="text" className="form-control" placeholder="Search WO #/Store #" />
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="submit">Search</button>
                  </span>
                </div>
              </li>
            </ul>
          </li>
          <li className="dropdown user d-xs-none d-sm-block d-md-block d-lg-block">
            <a data-toggle="dropdown" className="dropdown-toggle" href="javascript:void(0)" data-toggle-second="tooltip" data-placement="left" title="" data-original-title="More">
              <i className="mdi-navigation-more-vert"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <a className="dropdown-item" href="profile.html" target="_blank">
                  Profile
                        </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  }

}

export default TopNav