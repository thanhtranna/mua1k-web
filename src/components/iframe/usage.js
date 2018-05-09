// @flow weak

import React from 'react';
import IFrame from 'react-iframe';

const Help = () => {
    return (
        <div>
            <div className="text-center">
                <img src="images/icons/ic_list_lg.png" alt="" />
            </div>
            <div className="mgt-20">
                <IFrame
                    url="https://shop.kuberacoin.com/webview/rule/usage.html"
                    height="4000px"
                    position="relative"
                />
            </div>
        </div>
    )
};

export default Help;
