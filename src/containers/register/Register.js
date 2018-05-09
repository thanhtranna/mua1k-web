// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { I18n } from 'react-i18next';
import { validate } from './validation';
// import auth                  from '../../services/auth';
// #endregion

// #region flow types
type Props = {
  // react-router 4:
  match: any,
  location: any,
  history: any,

  // containers props:
  currentView: string,
  errorMessage: string,
  enterRegister: () => void,
  leaveRegister: () => void,

  // userAuth:
  isAuthenticated: boolean,
  isError: boolean,
  isFetching: boolean,
  isRegistering: boolean,
  registerUser: (
    username: string,
    email: string,
    password: string,
    confirm_password: string
  ) => any
};

type State = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  isOK: boolean
};
// #endregion

class Register extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.renderField = this.renderField.bind(this);
  }

  // #region propTypes
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // containers props:
    currentView: PropTypes.string.isRequired,
    enterRegister: PropTypes.func.isRequired,
    leaveRegister: PropTypes.func.isRequired,
    errorBadRequest: PropTypes.func.isRequired,

    // userAuth:
    isAuthenticated: PropTypes.bool,
    isAccountCreated: PropTypes.bool,
    isError: PropTypes.bool,
    errorMessage: PropTypes.string,
    isFetching: PropTypes.bool,
    isRegistering: PropTypes.bool,
    registerUser: PropTypes.func.isRequired
  };
  // #endregion

  static defaultProps = {
    isFetching: false,
    isRegistering: true
  };

  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isSuccess: false,
    isOK: true
  };

  // #region lifecycle methods
  componentDidMount() {
    const { enterRegister, history, isAuthenticated } = this.props;
    if (isAuthenticated) {
      history.push('/');
    } else {
      enterRegister();
    }
  }

  componentWillUnmount() {
    const { leaveRegister } = this.props;
    leaveRegister();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAccountCreated) this.setState({ isSuccess: true });
    if (nextProps.syncValidation && !nextProps.syncValidation.syncErrors) {
      this.setState({ isOK: false });
    } else {
      this.setState({ isOK: true });
    }
  }

  renderField = ({
    input,
    placeholder,
    type,
    fieldValue,
    trans,
    icon,
    meta: { touched, error, warning }
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
          onChange={e => this.setState({ [input.name]: e.target.value.trim() })}
        />
        {touched &&
          ((error && <span className="text-danger">{trans(error)}</span>) ||
            (warning && <span className="text-danger">{trans(warning)}</span>))}
      </div>
    );
  };

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      isOK,
      isSuccess
    } = this.state;
    const { isRegistering, isError, errorMessage } = this.props;
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="wrapper">
            <div className="_content page_content">
              <div className="container">
                <div className="main_content">
                  <div className="form_container">
                    <div className="form_box">
                      <div className="form_title">
                        <h3>{t('Account register')}</h3>
                      </div>
                      <div className="form_content">
                        <div role="form" className="form-common">
                          <div className="text-center">
                            {isError ? (
                              <span className="text-danger">
                                {t(errorMessage)}
                              </span>
                            ) : null}
                          </div>
                          <div className="text-center">
                            {isSuccess ? (
                              <span className="text-success">
                                {t('Register successfully!')}
                              </span>
                            ) : null}
                          </div>
                          <Field
                            name="username"
                            type="text"
                            component={this.renderField}
                            placeholder="User name"
                            icon="ic_user"
                            fieldValue={username}
                            trans={t}
                          />
                          <Field
                            name="email"
                            type="email"
                            component={this.renderField}
                            placeholder="Email"
                            icon="ic_email"
                            fieldValue={email}
                            trans={t}
                          />
                          <Field
                            name="password"
                            type="password"
                            component={this.renderField}
                            placeholder="Password"
                            icon="ic_lock"
                            fieldValue={password}
                            trans={t}
                          />
                          <Field
                            name="confirmPassword"
                            type="password"
                            component={this.renderField}
                            placeholder="Confirm password"
                            icon="ic_lock"
                            fieldValue={confirmPassword}
                            trans={t}
                          />
                          <div className="mgt-20 mgb-10">
                            <button
                              className="btn btn-green-1 btn-square"
                              disabled={isRegistering || isOK}
                              onClick={this.handlesOnRegister}
                            >
                              {isRegistering ? (
                                <span>
                                  {`${t('Registering')}...`}
                                  &nbsp;
                                  <i className="fa fa-spinner fa-pulse fa-fw" />
                                </span>
                              ) : (
                                <span>{t('Register')}</span>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
  // #endregion

  // #region on login button click callback
  handlesOnRegister = async (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }
    const { registerUser, errorBadRequest } = this.props;
    const { username, email, password, confirmPassword } = this.state;
    try {
      registerUser(username, email, password, confirmPassword);
    } catch (error) {
      errorBadRequest();
      /* eslint-disable no-console */
      console.log('register went wrong..., error: ', error);
      /* eslint-enable no-console */
    }
  };
  // #endregion

  // #region on go back home button click callback
  goHome = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }
    const { history } = this.props;
    history.push({ pathname: '/' });
  };
  // #endregion

  goToLogin = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }
    const { history } = this.props;
    history.push({ pathname: '/login' });
  };
}

export default reduxForm({
  form: 'syncValidation',
  validate
})(Register);
