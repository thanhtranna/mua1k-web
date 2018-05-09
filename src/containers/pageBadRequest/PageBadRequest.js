// @flow weak
import React, {
    PureComponent
}                       from 'react';
import PropTypes        from 'prop-types';
import { AnimatedView }     from '../../components';
import { Link } from 'react-router-dom';
import { I18n }                 from 'react-i18next';

// #region flow types
type
    Props = any;
type
    State = any;
// #endregion

class PageBadRequest extends PureComponent<Props, State> {
    static propTypes = {
        actions: PropTypes.shape({
            enterPageBadRequest: PropTypes.func.isRequired,
            leavePageBadRequest: PropTypes.func.isRequired
        })
    };

    componentDidMount() {
        const {
            actions: {
                enterPageBadRequest
            }
        } =  this.props;
        enterPageBadRequest();
    }

    componentWillUnmount() {
        const {
            actions: {
                leavePageBadRequest
            }
        } = this.props;
        leavePageBadRequest();
    }

    render() {
        return(
            <I18n ns="translations">
                {
                    (t, {i18n}) => (
                        <AnimatedView>
                            <div className="middle-box text-center animated fadeInDown" style={{'maxWidth': '400px', 'zIndex': '100', 'margin': '0 auto', 'paddingTop': '40px'}}>
                                <h1 style={{'fontSize': '90px', 'marginTop': '50%'}}>400</h1>
                                <h3 className="font-bold" style={{'fontWeight': '600'}}>{t('page_bad_request')}</h3>

                                <div className="error-desc" style={{'marginBottom': '55%'}}>
                                    {t('desc_page_bad_request')}
                                    <br/><Link to="/" className="btn btn-link m-t">{t('come_back_home')}</Link>
                                </div>
                            </div>
                        </AnimatedView>
                    )
                }
            </I18n>
        );
    }
}

export default PageBadRequest;
