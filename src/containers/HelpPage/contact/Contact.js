// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { I18n } from 'react-i18next';
import { validate } from './validation';
// #endregion

// #region flow types
type Props = {
  // react-router 4:
  match: any,
  location: any,
  history: any,

  // containers props:
  currentView: string,
  enterContact: () => void,
  leaveContact: () => void,

  // contact:
  messasge: string,
  isError: string,
  isFetching: boolean,
  isSending: boolean,
  contactCategories: array
};

type State = {
  contactCategory: string,
  email: string,
  content: string,
  isOK: boolean
};
// #endregion

class Contact extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.renderField = this.renderField.bind(this);
    this.renderTextAreaField = this.renderTextAreaField.bind(this);
    this.renderSelectField = this.renderSelectField.bind(this);
  }

  // #region propTypes
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // containers props:
    currentView: PropTypes.string.isRequired,
    enterContact: PropTypes.func.isRequired,
    leaveContact: PropTypes.func.isRequired,
    errorBadRequest: PropTypes.func.isRequired,

    // contact:
    isFetching: PropTypes.bool,
    isSending: PropTypes.bool,
    isError: PropTypes.bool,
    messasge: PropTypes.string,
    contactCategories: PropTypes.array
  };
  // #endregion

  static defaultProps = {
    isFetching: false,
    isSending: false
  };

  state = {
    contactCategory: '',
    email: '',
    content: '',
    isOK: true
  };

  resetForm() {
    this.setState({
      contactCategory: '',
      email: '',
      content: '',
      isOK: true
    });
  }

  // #region lifecycle methods
  componentDidMount() {
    const { enterContact, getContactCategoryIfNeed } = this.props;
    enterContact();
    getContactCategoryIfNeed();
  }

  componentWillUnmount() {
    const { leaveContact, resetContactStates } = this.props;
    resetContactStates();
    leaveContact();
  }

  componentWillReceiveProps(nextProps) {
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
    meta: { touched, error, warning }
  }) => {
    return (
      <div className="form-group">
        <label className="control-label" htmlFor="email">
          {trans('Email')}
        </label>
        <input
          {...input}
          placeholder={placeholder}
          type={type}
          className={`form-control`}
          id={`email`}
          value={fieldValue}
          onChange={e => this.setState({ [input.name]: e.target.value.trim() })}
        />
        {touched &&
          ((error && <span className="text-danger">{trans(error)}</span>) ||
            (warning && <span className="text-danger">{trans(warning)}</span>))}
      </div>
    );
  };

  renderTextAreaField = ({
    input,
    placeholder,
    rows,
    fieldValue,
    trans,
    meta: { touched, error, warning }
  }) => {
    return (
      <div className="form-group">
        <label className="control-label" htmlFor="content">
          {trans('content')}
        </label>
        <textarea
          {...input}
          placeholder={placeholder}
          rows={rows}
          className={`form-control`}
          id={`content`}
          value={fieldValue}
          onChange={e => this.setState({ [input.name]: e.target.value.trim() })}
        />
        {touched &&
          ((error && <span className="text-danger">{trans(error)}</span>) ||
            (warning && <span className="text-danger">{trans(warning)}</span>))}
      </div>
    );
  };

  renderSelectField = ({
    input,
    contactCategories,
    fieldValue,
    trans,
    meta: { touched, error, warning }
  }) => {
    return (
      <div className="form-group">
        <label className="control-label" htmlFor="contactCategory">
          {trans('contact_title')}
        </label>
        <select
          {...input}
          className={`form-control`}
          id={`contact-category`}
          value={fieldValue}
          onChange={e => this.setState({ [input.name]: e.target.value.trim() })}
        >
          <option value="">{trans('select_placeholder')}</option>
          {contactCategories.map((contact, key) => (
            <option key={key} value={contact._id}>
              {contact.name}
            </option>
          ))}
        </select>
        {touched &&
          ((error && <span className="text-danger">{trans(error)}</span>) ||
            (warning && <span className="text-danger">{trans(warning)}</span>))}
      </div>
    );
  };

  render() {
    const { contactCategory, email, content, isOK } = this.state;
    const { isSending, contactCategories, messasge, isError } = this.props;

    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="help-content">
            <div>
              <div className="text-center">
                <img src="/images/icons/ic_msg_lg.png" alt="" />
                <h3 className="mgt-20">{t('contact_title')}</h3>
              </div>
              <div className="mgt-20">
                <form>
                  <div className="text-center">
                    {isError ? (
                      <span className="text-danger">{t(messasge)}</span>
                    ) : (
                      <span className="text-success">{t(messasge)}</span>
                    )}
                  </div>
                  <Field
                    name="contactCategory"
                    contactCategories={contactCategories}
                    component={this.renderSelectField}
                    fieldValue={contactCategory}
                    trans={t}
                  />
                  <Field
                    name="email"
                    type="email"
                    component={this.renderField}
                    placeholder="Nhập địa chỉ Email"
                    fieldValue={email}
                    trans={t}
                  />
                  <Field
                    name="content"
                    rows="5"
                    component={this.renderTextAreaField}
                    placeholder="Nhập nội dung"
                    fieldValue={content}
                    trans={t}
                  />
                  <div className="text-right">
                    <button
                      className="btn btn-green-2 btn-square btn-square-sm"
                      disabled={isSending || isOK}
                      onClick={this.handleSubmitContact}
                    >
                      {isSending ? (
                        <span>
                          {`${t('Sending in')}...`}
                          &nbsp;
                          <i className="fa fa-spinner fa-pulse fa-fw" />
                        </span>
                      ) : (
                        <span>{t('Send')}</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }

  // #region on login button click callback
  handleSubmitContact = async (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }
    const { sendContactIfNeeded, errorBadRequest } = this.props;
    const { contactCategory, email, content } = this.state;
    try {
      sendContactIfNeeded(contactCategory, email, content);
      this.resetForm();
    } catch (error) {
      errorBadRequest();
      /* eslint-disable no-console */
      console.log('send contact went wrong..., error: ', error);
      this.resetForm();
      /* eslint-enable no-console */
    }
  };
  // #endregion
}

export default reduxForm({
  form: 'syncValidation',
  validate
})(Contact);
