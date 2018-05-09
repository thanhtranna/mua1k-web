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

class PageNotFound extends PureComponent<Props, State> {
  static propTypes = {
    actions: PropTypes.shape({
      enterPageNotFound: PropTypes.func.isRequired,
      leavePageNotFound: PropTypes.func.isRequired
    })
  };

  componentDidMount() {
    const { 
      actions: {
        enterPageNotFound
      } 
    } =  this.props;
    enterPageNotFound();
  }

  componentWillUnmount() {
    const { 
      actions: {
        leavePageNotFound
      }
    } = this.props;
    leavePageNotFound();
  }

  render() {
    return(
        <I18n ns="translations">
            {
                (t, {i18n}) => (
                  <AnimatedView>
                      <div className="middle-box text-center animated fadeInDown" style={{'maxWidth': '400px', 'zIndex': '100', 'margin': '0 auto', 'paddingTop': '40px'}}>
                          <h1 style={{'fontSize': '90px', 'marginTop': '50%'}}>404</h1>
                          <h3 className="font-bold" style={{'fontWeight': '600'}}>{t('page_not_found')}</h3>

                          <div className="error-desc" style={{'marginBottom': '50%'}}>
                              {t('desc_page_not_found')}
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

export default PageNotFound;
