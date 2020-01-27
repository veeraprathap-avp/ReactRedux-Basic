import React, { Component, Fragment } from "react";
import { Col, Row } from "react-materialize";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isSideNavOpen:false
    }
}
  toggleProfileBtn = () =>{
    debugger;
    this.setState({isSideNavOpen:!this.state.isSideNavOpen})
}
  render() {
    return (
      <Fragment>
           <a onClick={this.toggleProfileBtn} data-activates="slide-out" className="sidebar-collapse btn-floating btn-medium waves-effect waves-light pink accent-2">
            <i className="material-icons">menu</i>
          </a>
          <ul id="slide-out"  className={this.state.isSideNavOpen ? "side-nav leftside-navigation slideOut" :"side-nav leftside-navigation"}>
            <li className="no-padding">
              <ul className="collapsible" data-collapsible="accordion">
                <li className="bold">
                  <a className="collapsible-header waves-effect waves-cyan active">
                    <i className="material-icons">dashboard</i>
                    <span className="nav-text">Dashboard</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li className="active">
                        <a href="index-2.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>eCommerce</span>
                        </a>
                      </li>
                      <li>
                        <a href="dashboard-analytics.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Analytics</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a className="collapsible-header waves-effect waves-cyan">
                    <i className="material-icons">dvr</i>
                    <span className="nav-text">Templates</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a href="https://pixinvent.com/materialize-material-design-admin-template/html/collapsible-menu/">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span> Collapsible Menu</span>
                        </a>
                      </li>
                      <li>
                        <a href="https://pixinvent.com/materialize-material-design-admin-template/html/semi-dark-menu/">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span> Semi Dark Menu</span>
                        </a>
                      </li>
                      <li>
                        <a href="https://pixinvent.com/materialize-material-design-admin-template/html/fixed-menu/">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span> Fixed Menu</span>
                        </a>
                      </li>
                      <li>
                        <a href="index.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span> Overlay Menu</span>
                        </a>
                      </li>
                      <li>
                        <a href="https://pixinvent.com/materialize-material-design-admin-template/html/horizontal-menu/">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Horizontal Menu</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a className="collapsible-header waves-effect waves-cyan">
                    <i className="material-icons">web</i>
                    <span className="nav-text">Layouts</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a href="layout-light.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Light Layout</span>
                        </a>
                      </li>
                      <li>
                        <a href="layout-dark.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Dark Layout</span>
                        </a>
                      </li>
                      <li>
                        <a href="layout-fixed-footer.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Fixed Footer</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a className="collapsible-header waves-effect waves-cyan">
                    <i className="material-icons">cast</i>
                    <span className="nav-text">Cards</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a href="cards-basic.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span> Basic</span>
                        </a>
                      </li>
                      <li>
                        <a href="cards-advance.html" className="waves-effect waves-cyan">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span className="nav-text">Advance</span>
                        </a>
                      </li>
                      <li>
                        <a href="cards-extended.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Extended</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a href="app-email.html" className="waves-effect waves-cyan">
                    <i className="material-icons">mail_outline</i>
                    <span className="nav-text">Mailbox</span>
                  </a>
                </li>
                <li className="bold">
                  <a href="app-calendar.html" className="waves-effect waves-cyan">
                    <i className="material-icons">today</i>
                    <span className="nav-text">Calender</span>
                  </a>
                </li>
                <li className="bold">
                  <a className="collapsible-header waves-effect waves-cyan">
                    <i className="material-icons">invert_colors</i>
                    <span className="nav-text">CSS</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a href="css-typography.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Typography</span>
                        </a>
                      </li>
                      <li>
                        <a href="css-color.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span className="nav-text">Color</span>
                        </a>
                      </li>
                      <li>
                        <a href="css-grid.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span className="nav-text">Grid</span>
                        </a>
                      </li>
                      <li>
                        <a href="css-helpers.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span className="nav-text">Helpers</span>
                        </a>
                      </li>
                      <li>
                        <a href="css-media.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Media</span>
                        </a>
                      </li>
                      <li>
                        <a href="css-pulse.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Pulse</span>
                        </a>
                      </li>
                      <li>
                        <a href="css-sass.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Sass</span>
                        </a>
                      </li>
                      <li>
                        <a href="css-shadow.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Shadow</span>
                        </a>
                      </li>
                      <li>
                        <a href="css-animations.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Animations</span>
                        </a>
                      </li>
                      <li>
                        <a href="css-transitions.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Transition</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a className="collapsible-header  waves-effect waves-cyan">
                    <i className="material-icons">photo_filter</i>
                    <span className="nav-text">Basic UI</span>
                  </a>
                  <div className="collapsible-body">
                    <ul className="collapsible" data-collapsible="accordion">
                      <li className="bold">
                        <a className="collapsible-header  waves-effect waves-cyan">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span className="nav-text">Buttons</span>
                        </a>
                        <div className="collapsible-body">
                          <ul className="collapsible" data-collapsible="accordion">
                            <li>
                              <a href="ui-basic-buttons.html">
                                <i className="material-icons">keyboard_arrow_right</i>
                                <span>Basic</span>
                              </a>
                            </li>
                            <li>
                              <a href="ui-extended-buttons.html">
                                <i className="material-icons">keyboard_arrow_right</i>
                                <span>Extended</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <a href="ui-icons.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Icons</span>
                        </a>
                      </li>
                      <li>
                        <a href="ui-alerts.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Alerts</span>
                        </a>
                      </li>
                      <li>
                        <a href="ui-badges.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Badges</span>
                        </a>
                      </li>
                      <li>
                        <a href="ui-breadcrumbs.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Breadcrumbs</span>
                        </a>
                      </li>
                      <li>
                        <a href="ui-chips.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Chips</span>
                        </a>
                      </li>
                      <li>
                        <a href="ui-collections.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Collections</span>
                        </a>
                      </li>
                      <li>
                        <a href="ui-navbar.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Navbar</span>
                        </a>
                      </li>
                      <li>
                        <a href="ui-pagination.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Pagination</span>
                        </a>
                      </li>
                      <li>
                        <a href="ui-preloader.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Preloader</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a className="collapsible-header waves-effect waves-cyan">
                    <i className="material-icons">library_add</i>
                    <span className="nav-text">Advanced UI</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a href="advance-ui-carousel.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Carousel</span>
                        </a>
                      </li>
                      <li>
                        <a href="advance-ui-collapsibles.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Collapsible</span>
                        </a>
                      </li>
                      <li>
                        <a href="advance-ui-toasts.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Toasts</span>
                        </a>
                      </li>
                      <li>
                        <a href="advance-ui-tooltip.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Tooltip</span>
                        </a>
                      </li>
                      <li>
                        <a href="advance-ui-dropdown.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Dropdown</span>
                        </a>
                      </li>
                      <li>
                        <a href="advance-ui-feature-discovery.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Feature Discovery</span>
                        </a>
                      </li>
                      <li>
                        <a href="advanced-ui-media.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Media</span>
                        </a>
                      </li>
                      <li>
                        <a href="advanced-ui-modals.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Modals</span>
                        </a>
                      </li>
                      <li>
                        <a href="advance-ui-scrollfire.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>ScrollFire</span>
                        </a>
                      </li>
                      <li>
                        <a href="advance-ui-scrollspy.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Scrollspy</span>
                        </a>
                      </li>
                      <li>
                        <a href="advance-ui-tabs.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Tabs</span>
                        </a>
                      </li>
                      <li>
                        <a href="advance-ui-transitions.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Transitions</span>
                        </a>
                      </li>
                      <li>
                        <a href="advance-ui-waves.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Waves</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a className="collapsible-header waves-effect waves-cyan">
                    <i className="material-icons">add_to_queue</i>
                    <span className="nav-text">Extra Components</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a href="extra-components-range-slider.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Range Slider</span>
                        </a>
                      </li>
                      <li>
                        <a href="extra-components-sweetalert.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>SweetAlert</span>
                        </a>
                      </li>
                      <li>
                        <a href="extra-components-nestable.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Shortable & Nestable</span>
                        </a>
                      </li>
                      <li>
                        <a href="extra-components-translation.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Language Translation</span>
                        </a>
                      </li>
                      <li>
                        <a href="extra-components-highlight.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Highlight</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a className="collapsible-header  waves-effect waves-cyan">
                    <i className="material-icons">border_all</i>
                    <span className="nav-text">Tables</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a href="table-basic.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Basic Tables</span>
                        </a>
                      </li>
                      <li>
                        <a href="table-data.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Data Tables</span>
                        </a>
                      </li>
                      <li>
                        <a href="table-jsgrid.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>jsGrid</span>
                        </a>
                      </li>
                      <li>
                        <a href="table-editable.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Editable Table</span>
                        </a>
                      </li>
                      <li>
                        <a href="table-floatThead.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>FloatThead</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a className="collapsible-header  waves-effect waves-cyan">
                    <i className="material-icons">chrome_reader_mode</i>
                    <span className="nav-text">Forms</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a href="form-elements.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Form Elements</span>
                        </a>
                      </li>
                      <li>
                        <a href="form-layouts.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Form Layouts</span>
                        </a>
                      </li>
                      <li>
                        <a href="form-validation.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Form Validations</span>
                        </a>
                      </li>
                      <li>
                        <a href="form-masks.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Form Masks</span>
                        </a>
                      </li>
                      <li>
                        <a href="form-file-uploads.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>File Uploads</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a className="collapsible-header  waves-effect waves-cyan">
                    <i className="material-icons">pages</i>
                    <span className="nav-text">Pages</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a href="page-contact.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Contact Page</span>
                        </a>
                      </li>
                      <li>
                        <a href="page-todo.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>ToDos</span>
                        </a>
                      </li>
                      <li>
                        <a href="page-blog-1.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Blog Type 1</span>
                        </a>
                      </li>
                      <li>
                        <a href="page-blog-2.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Blog Type 2</span>
                        </a>
                      </li>
                      <li>
                        <a href="page-404.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>404</span>
                        </a>
                      </li>
                      <li>
                        <a href="page-500.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>500</span>
                        </a>
                      </li>
                      <li>
                        <a href="page-blank.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Blank</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a className="collapsible-header  waves-effect waves-cyan">
                    <i className="material-icons">add_shopping_cart</i>
                    <span className="nav-text">eCommers</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a href="eCommerce-products-page.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Products Page</span>
                        </a>
                      </li>
                      <li>
                        <a href="eCommerce-pricing.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Pricing Table</span>
                        </a>
                      </li>
                      <li>
                        <a href="eCommerce-invoice.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Invoice</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a className="collapsible-header waves-effect waves-cyan">
                    <i className="material-icons">perm_media</i>
                    <span className="nav-text">Medias</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a href="media-gallary-page.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Gallery Page</span>
                        </a>
                      </li>
                      <li>
                        <a href="media-hover-effects.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Image Hover Effects</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a className="collapsible-header  waves-effect waves-cyan">
                    <i className="material-icons">account_circle</i>
                    <span className="nav-text">User</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a href="user-profile-page.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>User Profile</span>
                        </a>
                      </li>
                      <li>
                        <a href="user-login.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Login</span>
                        </a>
                      </li>
                      <li>
                        <a href="user-register.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Register</span>
                        </a>
                      </li>
                      <li>
                        <a href="user-forgot-password.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Forgot Password</span>
                        </a>
                      </li>
                      <li>
                        <a href="user-lock-screen.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Lock Screen</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="bold">
                  <a className="collapsible-header waves-effect waves-cyan">
                    <i className="material-icons">pie_chart_outlined</i>
                    <span className="nav-text">Charts</span>
                  </a>
                  <div className="collapsible-body">
                    <ul>
                      <li>
                        <a href="charts-chartjs.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Chart JS</span>
                        </a>
                      </li>
                      <li>
                        <a href="charts-chartist.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Chartist</span>
                        </a>
                      </li>
                      <li>
                        <a href="charts-morris.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Morris Charts</span>
                        </a>
                      </li>
                      <li>
                        <a href="charts-xcharts.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>xCharts</span>
                        </a>
                      </li>
                      <li>
                        <a href="charts-flotcharts.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Flot Charts</span>
                        </a>
                      </li>
                      <li>
                        <a href="charts-sparklines.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Sparkline Charts</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>
            <li className="li-hover">
              <p className="ultra-small margin more-text">MORE</p>
            </li>
            <li>
              <a href="angular-ui.html">
                <i className="material-icons">verified_user</i>
                <span className="nav-text">Angular UI</span>
              </a>
            </li>
            <li className="no-padding">
              <ul className="collapsible" data-collapsible="accordion">
                <li className="bold">
                  <a className="collapsible-header  waves-effect waves-cyan">
                    <i className="material-icons">photo_filter</i>
                    <span className="nav-text">Menu Levels</span>
                  </a>
                  <div className="collapsible-body">
                    <ul className="collapsible" data-collapsible="accordion">
                      <li>
                        <a href="ui-basic-buttons.html">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span>Second level</span>
                        </a>
                      </li>
                      <li className="bold">
                        <a className="collapsible-header  waves-effect waves-cyan">
                          <i className="material-icons">keyboard_arrow_right</i>
                          <span className="nav-text">Second level child</span>
                        </a>
                        <div className="collapsible-body">
                          <ul className="collapsible" data-collapsible="accordion">
                            <li>
                              <a href="ui-basic-buttons.html">
                                <i className="material-icons">keyboard_arrow_right</i>
                                <span>Third level</span>
                              </a>
                            </li>
                            <li className="bold">
                              <a className="collapsible-header  waves-effect waves-cyan">
                                <i className="material-icons">keyboard_arrow_right</i>
                                <span className="nav-text">Third level child</span>
                              </a>
                              <div className="collapsible-body">
                                <ul className="collapsible" data-collapsible="accordion">
                                  <li>
                                    <a href="ui-basic-buttons.html">
                                      <i className="material-icons">keyboard_arrow_right</i>
                                      <span>Forth level</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="ui-extended-buttons.html">
                                      <i className="material-icons">keyboard_arrow_right</i>
                                      <span>Forth level</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <a href="changelogs.html">
                <i className="material-icons">track_changes</i>
                <span className="nav-text">Changelogs</span>
              </a>
            </li>
            <li>
              <a href="changelogs.html">
                <i className="material-icons">help_outline</i>
                <span className="nav-text">Support</span>
              </a>
            </li>
          </ul>
         {this.state.isSideNavOpen ? <div id="sidenav-overlay" onClick={this.toggleProfileBtn}></div> : null} 
    </Fragment>
    );
  }
}
export default SideNav;