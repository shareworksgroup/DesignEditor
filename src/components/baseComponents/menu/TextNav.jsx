import React from 'react'

class TextNav extends React.Component {

  render() {
    return <div className="fixed-sidebar-left">
      <div className="slimScrollDiv">
      <ul className="nav side-nav nicescroll-bar">
        <li>
          <a href="index.html">
            <span className="right-nav-text">Dashboard</span>
          </a>
        </li>
        <li>
          <a className="active" href="javascript:void(0);" data-toggle="collapse" data-target="#wo_mgt_dr">
            <span className="right-nav-text">WO Management <b className="caret"></b></span>
          </a>
          <ul id="wo_mgt_dr" className="collapse submenu two-col-list">
            <li>
              <a href="wo-list.html">Recurring WO</a>
            </li>
            <li>
              <a href="javascript:void(0);">Reactive WO</a>
            </li>
            <li>
              <a href="javascript:void(0);">SIM WO</a>
            </li>
            <li>
              <a href="javascript:void(0);">Turn Dashboard</a>
            </li>
            <li>
              <a href="javascript:void(0);">Turn Management</a>
            </li>
            <li>
              <a href="javascript:void(0);">Inspect Management</a>
            </li>
            <li>
              <a href="javascript:void(0);">Open WOs Map</a>
            </li>
            <li>
              <a href="javascript:void(0);">ProCare Management</a>
            </li>
            <li>
              <a href="javascript:void(0);">Survey Property</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript:void(0);" data-toggle="collapse" data-target="#invoice_dr">
            <span className="right-nav-text">Invoice <b className="caret"></b></span>
          </a>
          <ul id="invoice_dr" className="collapse submenu">
            <li>
              <a href="product-cart.html">Invoice Batch Report</a>
            </li>
            <li>
              <a href="product-checkout.html">Expense by Property</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript:void(0);" data-toggle="collapse" data-target="#ad_report_dr">
            <span className="right-nav-text">Advanced Report <b className="caret"></b></span>
          </a>
          <ul id="ad_report_dr" className="collapse submenu two-col-list">
            <li>
              <a href="javascript:void(0);">Key Performance Indicators</a>
            </li>
            <li>
              <a href="javascript:void(0);">Budget Tracking by Month</a>
            </li>
            <li>
              <a href="javascript:void(0);">SLA Reports</a>
            </li>
            <li>
              <a href="javascript:void(0);">Metrics</a>
            </li>
            <li>
              <a href="javascript:void(0);">Metrics by Market</a>
            </li>
            <li>
              <a href="javascript:void(0);">Metrics by Category</a>
            </li>
            <li>
              <a href="javascript:void(0);">Trends</a>
            </li>
            <li>
              <a href="javascript:void(0);">Work Order LeaderBoard</a>
            </li>
            <li>
              <a href="javascript:void(0);">WO Status Aging Report</a>
            </li>
            <li>
              <a href="javascript:void(0);">WO Status Aging Report 2</a>
            </li>
            <li>
              <a href="javascript:void(0);">Financial Overview</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript:void(0);">
            <span className="right-nav-text">Calendar</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0);">
            <span className="right-nav-text">Property</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0);">
            <span className="right-nav-text">Survey</span>
          </a>
        </li>
      </ul>
      <div className="slimScrollBar"></div><div className="slimScrollRail"></div></div>
    </div>
  }

}

export default TextNav