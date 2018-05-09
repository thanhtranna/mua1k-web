// @flow weak

import React from 'react';
import PropTypes from "prop-types";

const Footer = ({
    copyright,
    children
}) => (
  <footer className="footer">
    <div className="footer-bg">
      <div className="container">
        <div className="row">
            {children}
        </div>
      </div>
      <div className="footer-cpr">
        <div className="container">
          <p className="text-left">{ copyright }</p>
        </div>
      </div>
    </div>
    <a onClick={() => window.scrollTo(0,0)} className="totop" id="back-to-top"><i className="fa fa-chevron-up"></i></a>
  </footer>
);

Footer.propTypes = {
    copyright: PropTypes.string,
    children: PropTypes.node
};

Footer.defaultProps = {
    copyright: '© Copyright 2018 Tokubuy, Inc. All Rights Reserved'
};

export default Footer;
