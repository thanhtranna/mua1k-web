// @flow weak

import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import Image from 'react-image-resizer';
import CountDown from '../../countDown';

const AuctionRunning = ({
    auction
}) => {
    const { product, remainingTime } = auction;
    const { featureImage, name } = product;
    return (
        <li>
            <Link to={'/'}>
                <div className="img_avt">
                    <Image
                        src={featureImage.origin}
                        width={110}
                        height={110}
                        alt={name}
                    />
                </div>
                <div className="text">
                    <h4>{name}</h4>
                    <CountDown seconds={remainingTime}/>
                </div>
            </Link>
        </li>
    )
};

AuctionRunning.propTypes = {
    auction: PropTypes.object,
};

AuctionRunning.defaultProps = {
    auction: {},
};

export default AuctionRunning;
