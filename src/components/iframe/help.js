// @flow weak

import React from 'react';
import IFrame from 'react-iframe';

const Help = () => {
    return (
        <div>
            <div className="text-center">
                <img src="images/icons/ic_question_lg.png" alt=""/>
            </div>
            <div className="mgt-20">
                <IFrame
                    url="https://shop.kuberacoin.com/webview/helps/"
                    height="3000px"
                    position="relative"
                />
            </div>
        </div>
    )
};

export default Help;
