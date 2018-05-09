// @flow weak

import React from 'react';
import PropTypes from "prop-types";

const CampaignCard = ({
    campaign
}) => {
    const { url, banner } = campaign;
    let image = 'images/viettel-500.png';
    if(banner && banner.origin)
        image = banner.origin;
    return (
        <div className="item">
            <a href={url}>
                <img src={image} alt="banner" style={{ height: 282 }} />
            </a>
        </div>
    )
};

CampaignCard.propTypes = {
    campaign: PropTypes.object,
};

CampaignCard.defaultProps = {
    campaign: {},
};

export default CampaignCard;
