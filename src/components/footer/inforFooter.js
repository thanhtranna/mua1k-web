// @flow weak

import React from 'react';
import PropTypes from "prop-types";

const inforFooter = ({
     title,
     grid,
     classInfor,
     children
 }) => (
    <div className={grid}>
        <div className={classInfor}>
            <h3>{ title }</h3>
            {children}
        </div>
    </div>
);

inforFooter.propTypes = {
    title: PropTypes.string,
    grid: PropTypes.string,
    classInfor: PropTypes.string,
    children: PropTypes.node
};

inforFooter.defaultProps = {
    title: 'Title information',
    grid: 'col-xs-12 col-sm-3 col-md-3',
    classInfor: 'footer-item'
};

export default inforFooter;
