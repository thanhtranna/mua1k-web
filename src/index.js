// @flow weak

// #region imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'animate.css';
// eslint-disable-next-line
// import $ from 'jquery/src/jquery';
import 'font-awesome/css/font-awesome.min.css';
import 'ionicons/dist/css/ionicons.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
// import 'bootstrap/dist/js/bootstrap.js';
import 'react-owl-carousel2/src/owl.carousel.css'; //Allows for server-side rendering.
import 'react-owl-carousel2/lib/OwlCarousel.min'; //Allows for server-side rendering.
import './i18n';
import registerServiceWorker from './registerServiceWorker';
require('dotenv').config();
// #endregion

const ELEMENT_TO_BOOTSTRAP: string = 'root';
const BootstrapedElement: any = document.getElementById(ELEMENT_TO_BOOTSTRAP);

ReactDOM.render( < App / > , BootstrapedElement);
registerServiceWorker();