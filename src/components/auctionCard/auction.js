// @flow weak

import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const auctionCard = ({
     url,
     image,
     alt,
     title,
     grid,
     iconCart,
     textTotal,
     numberTotal,
     numberSoldOut,
     textRest,
 }) => {
    textTotal = `Total: ${numberTotal} chance`;
    textRest = `Rest: ${numberTotal - numberSoldOut} chance`;
    let progressBarValue = (numberSoldOut/numberTotal)*100;

    return  (
        <div className={grid}>
            <div className="item_product">
                <Link to={url} className="item_avatar">
                    <img src={image} alt={alt} style={{height:150}}/>
                </Link>
                <h4><Link to={url} className="textblack">{title}</Link></h4>
                <p>{textTotal}</p>
                <div className="progress_cart">
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${progressBarValue}%` }} aria-valuenow={progressBarValue}
                             aria-valuemin={0} aria-valuemax={100}>
                        </div>
                    </div>
                    <Link to="#" className="button-cart">
                        {iconCart}
                    </Link>
                </div>
                <p>{textRest}</p>
            </div>
        </div>
    )
};

auctionCard.propTypes = {
    url: PropTypes.string,
    grid: PropTypes.string,
    iconCart: PropTypes.node,
    image: PropTypes.string,
    title: PropTypes.string,
    alt: PropTypes.string,
    numberTotal: PropTypes.number,
    numberSoldOut: PropTypes.number,
    textTotal: PropTypes.string,
    textRest: PropTypes.string
};

auctionCard.defaultProps = {
    url: '/',
    grid: 'col-xs-12 col-sm-6 col-md-6 col-lg-4',
    iconCart: (<i className="fa fa-shopping-cart" aria-hidden="true"></i>),
    image: 'images/product.png',
    title: 'title auction card',
    alt: 'No image',
    numberTotal: 0,
    numberSoldOut: 0,
    textTotal: 'Total: 0 chance',
    textRest: 'Rest: 0 chance'
};

export default auctionCard;
