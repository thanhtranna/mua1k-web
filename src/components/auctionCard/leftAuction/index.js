// @flow weak

import React from 'react';
import PropTypes from "prop-types";
import AuctionRunning from './auctionRunning';
import AuctionFinish from './auctionFinish';

const LeftAuction = ({
    auction,
    trans,
}) => {
    const { status } = auction;
    return status === 2 ?
        (
            <AuctionRunning auction={auction} />
        )
        :
        (
            <AuctionFinish auction={auction} trans={trans} />
        )
};

LeftAuction.propTypes = {
    auction: PropTypes.object,
    trans: PropTypes.func,
};

LeftAuction.defaultProps = {
    auction: {},
    trans: () => {},
};

export default LeftAuction;
