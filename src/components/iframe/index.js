// @flow weak

import React                from 'react';
import Help                 from './help';
import PrivacyPolicy        from './privacyPolicy';
import Usage                from './usage';

const IFrame = ({ pageKey }) => {
    switch (pageKey) {
        case 'help':
            return (<Help/>);
        case 'privacy-policy':
            return (<PrivacyPolicy/>);
        case 'usage':
            return (<Usage/>);
        default:
            return (<Help/>);
    }
};

export default IFrame;
