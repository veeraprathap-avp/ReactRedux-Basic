/* eslint-disable linebreak-style */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Navbar, NavItem, Icon, Dropdown, Button,Col,Row } from "react-materialize";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {          
        };
    }
    render() {

        return (
          <Fragment>
            <footer className="page-footer">
              <div className="footer-copyright">
                <div className="container">
                  <span>Copyright © 2018
                        <a className="grey-text text-lighten-4" href="http://themeforest.net/user/pixinvent/portfolio?ref=pixinvent" target="_blank">PIXINVENT</a> All rights reserved.</span>
                  <span className="right hide-on-small-only"> Design and Developed by <a className="grey-text text-lighten-4" href="https://pixinvent.com/">PIXINVENT</a></span>
                </div>
              </div>
            </footer>
          </Fragment>
        );
    }
}

Footer.propTypes = {
    history: PropTypes.object
};
Footer.defaultProps = {
    history: {}
};

export default (Footer);