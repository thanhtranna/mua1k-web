// @flow weak

import React from 'react';
import PropTypes from "prop-types";

const listFooter = ({
     children
 }) => (
    <ul>
        {children}
    </ul>
);

listFooter.propTypes = {
    children: PropTypes.node
};

listFooter.defaultProps = {
};

export default listFooter;
