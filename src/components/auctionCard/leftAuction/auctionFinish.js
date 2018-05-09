// @flow weak

import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import Image from 'react-image-resizer';
import { dateTimeFormatter } from "../../../helpers/index";

const AuctionFinish = ({
    auction,
    trans,
}) => {
    const { product, winner, finishAt } = auction;
    const { featureImage, name, chanceNumber } = product;
    const { user, chanceBought } = winner;
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
                    <p>{`${trans('Total')}: ${chanceNumber} ${trans('chances')}`}</p>
                    <p>{`${trans('Finish at')}: ${dateTimeFormatter(finishAt)}`}</p>
                    <p>{`${trans('Winner')}: ${user.nickname}`}</p>
                    <p>{`${trans('Bought')}: ${chanceBought} ${trans('chances')}`}</p>
                </div>
            </Link>
        </li>
    )
};

AuctionFinish.propTypes = {
    auction: PropTypes.object,
    trans: PropTypes.func,
};

AuctionFinish.defaultProps = {
    auction: {},
    trans: () => {},
};

export default AuctionFinish;
