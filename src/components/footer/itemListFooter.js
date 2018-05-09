// @flow weak

import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const itemListFooter = ({
    url,
    children
}) => (
    <li><Link to={ url }>{ children }</Link></li>
);

itemListFooter.propTypes = {
    url: PropTypes.string,
    children: PropTypes.node
};

itemListFooter.defaultProps = {
    url: "/"
};

export default itemListFooter;
