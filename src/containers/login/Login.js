// @flow strong #region imports
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {I18n} from 'react-i18next';
import {validate} from './validation';
// import auth                  from '../../services/auth'; #endregion #region
// flow types
type Props = {
  // react-router 4:
  match: any,
  location: any,
  history: any,

  // containers props:
  currentView: string,
  errorMessage: string,
  enterLogin: () => void,
  leaveLogin: () => void,

  // userAuth:
  isAuthenticated: boolean,
  isError: boolean,
  isFetching: boolean,
  isLogging: boolean,
  disconnectUser: () => any,
  logUserIfNeeded: (username : string, password : string) => any
};

type State = {
  username: string,
  password: string,
  isOK: boolean
};
// #endregion

class Login extends PureComponent < Props, State > {
  constructor(props) {
    super(props);
    this.renderField = this
      .renderField
      .bind(this);
  }

  // #region propTypes
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // containers props:
    currentView: PropTypes.string.isRequired,
    enterLogin: PropTypes.func.isRequired,
    leaveLogin: PropTypes.func.isRequired,
    errorBadRequest: PropTypes.func.isRequired,

    // userAuth:
    isAuthenticated: PropTypes.bool,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
    isFetching: PropTypes.bool,
    isLogging: PropTypes.bool,
    disconnectUser: PropTypes.func.isRequired,
    logUserIfNeeded: PropTypes.func.isRequired
  };
  // #endregion

  static defaultProps = {
    isFetching: false,
    isLogging: true
  };

  state = {
    username: '',
    password: '',
    isOK: true
  };

  // #region lifecycle methods
  componentDidMount() {
    const {enterLogin} = this.props;
    enterLogin();
  }

  componentWillUnmount() {
    const {leaveLogin} = this.props;
    leaveLogin();
  }

  componentWillReceiveProps(nextProps) {
    const {history} = this.props;
    if (nextProps.isAuthenticated) 
      history.push('/');
    if (nextProps.syncValidation && !nextProps.syncValidation.syncErrors) {
      this.setState({isOK: false});
    } else {
      this.setState({isOK: true});
    }
  }

  renderField = ({
    input,
    placeholder,
    type,
    fieldValue,
    trans,
    icon,
    meta: {
      touched,
      error,
      warning
    }
  }) => {
    return (
      <div className="form-group">
        <input
          {...input}
          placeholder={placeholder}
          type={type}
          className={`form-control has-icon ${icon}`}
          id={trans(placeholder)}
          value={fieldValue}
          onChange={e => this.setState({
          [input.name]: e
            .target
            .value
            .trim()
        })}/> {touched && ((error && <span className="text-danger">{trans(error)}</span>) || (warning && <span className="text-danger">{trans(warning)}</span>))}
      </div>
    )
  };

  render() {
    const {username, password, isOK} = this.state;
    const {isLogging, isError, errorMessage} = this.props;
    return (
      <I18n ns="translations">
        {(t, {i18n}) => (
          <div className="wrapper">
            <div className="_content page_content">
              <div className="container">
                <div className="main_content">
                  <div className="form_container">
                    <div className="form_box">
                      <div className="form_title">
                        <h3>{t('Account login')}</h3>
                      </div>
                      <div className="form_content">
                        <div role="form" className="form-common">
                          <div className="text-center">{isError
                              ? <span className="text-danger">{t(errorMessage)}</span>
                              : null}</div>
                          <Field
                            name="username"
                            type="text"
                            component={this.renderField}
                            placeholder="Email address"
                            icon="ic_user"
                            fieldValue={username}
                            trans={t}/>
                          <Field
                            name="password"
                            type="password"
                            component={this.renderField}
                            placeholder="Password"
                            icon="ic_lock"
                            fieldValue={password}
                            trans={t}/>
                          <div className="mgt-20 mgb-10">
                            <button
                              className="btn btn-green-1 btn-square"
                              disabled={isLogging || isOK}
                              onClick={this.handlesOnLogin}>
                              {
                                isLogging
                                ? <span>
                                    {`${t('Logging in')}...`}
                                    &nbsp;
                                    <i className="fa fa-spinner fa-pulse fa-fw"/>
                                  </span>
                                : <span>
                                  {t('Login')}
                                </span>
                              }
                            </button>
                          </div>
                          <p className="text-center">
                            <Link className="link" to="#">{t('Person who forgot password?')}</Link>
                          </p>
                          {/*<div className="login-social">*/}
                          {/*<ul>*/}
                          {/*<li><Link to="#"><img src="images/icons/ic_facebook.png"*/}
                          {/*alt=""/></Link>*/}
                          {/*</li>*/}
                          {/*<li><Link to="#"><img src="images/icons/ic_twitter.png"*/}
                          {/*alt=""/></Link>*/}
                          {/*</li>*/}
                          {/*<li><Link to="#"><img src="images/icons/ic_line.png" alt=""/></Link>*/}
                          {/*</li>*/}
                          {/*</ul>*/}
                          {/*</div>*/}
                          <div className="line-dot"/>
                          <Link to="/register" type="submit" className="btn btn-green-1 btn-square">{t('Sign up')}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        }
      </I18n>
    );
  }
  // #endregion #region on login button click callback
  handlesOnLogin = async(event : SyntheticEvent <>) => {
    if (event) {
      event.preventDefault();
    }
    const {logUserIfNeeded, errorBadRequest} = this.props;
    const {username, password} = this.state;
    try {
      logUserIfNeeded(username, password);
    } catch (error) {
      errorBadRequest();
      /* eslint-disable no-console */
      console.log('login went wrong..., error: ', error);
      /* eslint-enable no-console */
    }
  };
  // #endregion #region on go back home button click callback
  goHome = (event : SyntheticEvent <>) => {
    if (event) {
      event.preventDefault();
    }
    const {history} = this.props;
    history.push({pathname: '/'});
  }
  // #endregion
}

export default reduxForm({form: 'syncValidation', validate})(Login);
