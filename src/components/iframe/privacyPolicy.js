// @flow weak

import React from 'react';
import IFrame from 'react-iframe';

const Help = () => {
    return (
        <div>
            <div className="text-center">
                <img src="images/icons/ic_category_check_lg.png" alt="" />
            </div>
            <div className="mgt-20">
                <IFrame
                    url="https://shop.kuberacoin.com/webview/rule/persional_info.html"
                    height="3000px"
                    position="relative"
                />
            </div>
        </div>
    )
};

export default Help;
